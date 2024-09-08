from multiprocessing import Value
import requests
import json
import ipaddress

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
    latitude = data.get('latitude')
    longitude = data.get('longitude')
    return latitude, longitude

def get_ip_ipcalc(ip):
    url = f"https://ipdb.ipcalc.co/ipdata/{ip}"
    response = requests.get(url)
    data = response.json()
    location = data.get('location')
    latitude = location.get('latitude')
    longitude = location.get('longitude')
    return latitude, longitude

def get_ip_ipinfo(ip):
    try:
        url = f"https://ipinfo.io/{ip}/json"
        response = requests.get(url)
        data = response.json()
        location = data.get('loc')
        arr = location.split(",")
        latitude = arr[0]
        longitude = arr[1]
        return latitude, longitude
    except Exception:        
        latitude = "None"
        longitude = "None"
        return latitude, longitude

while True:
    ip = input("IP or domain: ")
    check_ip_adress(ip)
    if(check == True): break

latitude, longitude = get_ip_whois(ip)
print(f"[whois] \tLatitude: {latitude}\tLongitude: {longitude}")

latitude, longitude = get_ip_ipcalc(ip)
print(f"[ipcalc]\tLatitude: {latitude}\tLongitude: {longitude}")

latitude, longitude = get_ip_ipinfo(ip)
if latitude == "None" and longitude == "None":
    print("[ipinfo]\tOnly accepts IP adresses")
else:
    print(f"[ipinfo]\tLatitude: {latitude}\tLongitude: {longitude}")
    #kkjkfkjasffkbjko_ogo_kruto