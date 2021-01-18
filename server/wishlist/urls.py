

from django.urls import include, path
from rest_framework import routers

from .views import WishlistViewSet

router = routers.DefaultRouter()

router.register('wishlist', WishlistViewSet)

urlpatterns = [
    path('', include(router.urls))
]