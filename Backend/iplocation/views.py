from django.shortcuts import render
import requests
import socket
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import IpLocation
from .serializers import IpLocationSerializer
from rest_framework import status

class IpProcessor(APIView):
    def post(self, request):
        input_data = request.data.get('input_data')
        try:
            url = f"https://ipwhois.app/json/{input_data}"
            response = requests.get(url)
            data = response.json()
            lat1 = data.get('latitude')
            lon1 = data.get('longitude')

            url = f"https://ipdb.ipcalc.co/ipdata/{input_data}"
            response = requests.get(url)
            data = response.json()
            location = data.get('location')
            lat2 = location.get('latitude')
            lon2 = location.get('longitude')

            try:
                url = f"https://ipinfo.io/{input_data}/json"
                response = requests.get(url)
                data = response.json()
                location = data.get('loc')
                arr = location.split(",")
                lat3 = arr[0]
                lon3 = arr[1]
            except Exception:        
                lat3 = 0
                lon3 = 0

            ip_query = IpLocation(input_data=input_data, lat1=lat1, lon1=lon1, lat2=lat2, lon2=lon2, lat3=lat3, lon3=lon3)
            ip_query.save()

            serializer = IpLocationSerializer(ip_query)
            return Response(serializer.data, status=status.HTTP_200_OK)


        except Exception as e:
            print("Error E")
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)