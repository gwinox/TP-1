from rest_framework.routers import DefaultRouter
from iplocation.api.urls import coordinates_router
from django.urls import path, include

router = DefaultRouter()
router.registry.extend(coordinates_router.registry)

urlpatterns = [
    path('', include(router.urls))
]