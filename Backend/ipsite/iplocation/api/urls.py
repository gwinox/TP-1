from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import CoordinatesViewSet

coordinates_router = DefaultRouter()
coordinates_router.register(r'Coordinates', CoordinatesViewSet)