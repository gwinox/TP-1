from django.urls import path
from .views import IpProcessor

urlpatterns = [
    path('iplocation/', IpProcessor.as_view(), name='iplocation'),
]