"""
URL configuration for py_backend project.

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
from django.urls import re_path , include
from backend import views
from backend.views import *

#from django.conf.urls import url
#Был path, а стал re_path, тк django.conf.urls.url() was deprecated in Django 3.0, and is removed in Django 4.0+.

urlpatterns = [
    re_path('', ReactView.as_view(), name="anything"),
    re_path('about', views.about),
]
