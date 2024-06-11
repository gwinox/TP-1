import sqlite3
from django.http import HttpResponse
from multiprocessing import Value
import requests
import ipaddress 

from rest_framework.views import APIView
from .models import *
from .serializer import *
from rest_framework.response import Response
from django.shortcuts import render

class ReactView(APIView):
    def get(self, request):
        output = [{"ip": output.ip} 
                  for output in React.objects.all()]
        return Response(output)
    
    def post(self, request):
        serializer = ReactSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


def appendData(ip, lat1, lon1, lat2, lon2, lat3, lon3):
    connection = sqlite3.connect("C:\django\history.db")
    cursor = connection.cursor()
    if lat3 == "None" and lon3 == "None":
        cursor.execute('INSERT INTO history (type, input, lat1, lon1, lat2, lon2) VALUES (?, ?, ?, ?, ?, ?)', ("Domain", ip, lat1, lon1, lat2, lon2))
    else:
        cursor.execute('INSERT INTO history (type, input, lat1, lon1, lat2, lon2, lat3, lon3) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', ("IP", ip, lat1, lon1, lat2, lon2, lat3, lon3))
    connection.commit()
    connection.close()

def check_ip_adress(ip):
    global check
    try:
        ip_adress = ipaddress.ip_address(ip)
        print(f"IP '{ip_adress}' is valid")
        check = True
    except ValueError:     
        try:
            response = requests.get(f'http://{ip}')
            if response.status_code == 200:
                print(f"Domain '{ip}' is valid")
                check = True
        except requests.exceptions.ConnectionError:
            print(f"'{ip}' does not exist, try again")
            check = False

def get_ip_whois(ip):
    url = f"https://ipwhois.app/json/{ip}"
    response = requests.get(url)
    data = response.json()
    lat1 = data.get('latitude')
    lon1 = data.get('longitude')
    return lat1, lon1

def get_ip_ipcalc(ip):
    url = f"https://ipdb.ipcalc.co/ipdata/{ip}"
    response = requests.get(url)
    data = response.json()
    location = data.get('location')
    lat2 = location.get('latitude')
    lon2 = location.get('longitude')
    return lat2, lon2

def get_ip_ipinfo(ip):
    try:
        url = f"https://ipinfo.io/{ip}/json"
        response = requests.get(url)
        data = response.json()
        location = data.get('loc')
        arr = location.split(",")
        lat3 = arr[0]
        lon3 = arr[1]
        return lat3, lon3
    except Exception:        
        lat3 = "None"
        lon3 = "None"
        return lat3, lon3

while True:
    ip = input("IP or domain: ")
    check_ip_adress(ip)
    if(check == True): break

lat1, lon1 = get_ip_whois(ip)
lat2, lon2 = get_ip_ipcalc(ip)
lat3, lon3 = get_ip_ipinfo(ip)

appendData(ip, lat1, lon1, lat2, lon2, lat3, lon3)

def index(request):
    return HttpResponse("This is an empty index page; Go visit /about")

def about(request):
    lat1, lon1 = get_ip_whois(ip)
    lat2, lon2 = get_ip_ipcalc(ip)
    lat3, lon3 = get_ip_ipinfo(ip)

    if lat3 == "None" and lon3 == "None":
        return HttpResponse(f"""
                <h2>[{ip}] Location</h2>
                <p>[whois]  Latitude: {lat1}&ensp;Longitude: {lon1}</p>
                <p>[ipcalc] Latitude: {lat2}&emsp;Longitude: {lon2}</p>
                <p>[ipinfo] Only accepts IP adresses</p>
        """)
    else:
        return HttpResponse(f"""
                <h2>[{ip}] Location</h2>
                <p>[whois]  Latitude: {lat1}  Longitude: {lon1}</p>
                <p>[ipcalc] Latitude: {lat2}  Longitude: {lon2}</p>
                <p>[ipinfo] Latitude: {lat3}  Longitude: {lon3}</p>
        """)