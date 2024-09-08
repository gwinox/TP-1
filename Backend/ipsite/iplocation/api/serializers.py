from rest_framework.serializers import ModelSerializer
from ..models import Coordinates
class IplocationSerializer(ModelSerializer):
    class Meta:
        model = Coordinates
        fields = ('id', 'query_date', 'lat1', 'lon1', 'lat2', 'lon2', 'lat3', 'lon3')