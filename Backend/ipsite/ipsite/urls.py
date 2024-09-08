"""
URL configuration for ipsite project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from iplocation import views
from iplocation.views import *

urlpatterns = [
    path("", views.index, name="index"),
    path("admin/", admin.site.urls),
    path("api/", include('ipsite.api.urls')),
    #path('coordinates/', include('ipsite.urls')),
    #path('api/', include('iplocation.api.urls'),)
    #path('index',views.index),
    #path('about', views.about),
]
