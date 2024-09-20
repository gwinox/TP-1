from rest_framework import serializers
from .models import IpLocation

class IpLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = IpLocation
        fields = ['input_data', 'query_date', 'lat1', 'lon1', 'lat2', 'lon2', 'lat3', 'lon3']