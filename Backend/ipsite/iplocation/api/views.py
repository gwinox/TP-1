from rest_framework.viewsets import ModelViewSet
from ..models import Coordinates
from .serializers import IplocationSerializer

class CoordinatesViewSet(ModelViewSet):
    queryset = Coordinates.objects.all()
    serializer_class = IplocationSerializer