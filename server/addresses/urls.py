from django.urls import include, path
from rest_framework import routers

from .views import AddressViewSet

router = routers.DefaultRouter()

router.register('address', AddressViewSet)

urlpatterns = [
    path('', include(router.urls))
]