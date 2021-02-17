from django.urls import path, include
from rest_framework import routers

from .views import (
    CartViewSet,
    CartQuantitySubtractView
)

router = routers.DefaultRouter()
router.register('carts', CartViewSet, basename='cart')

urlpatterns = [
    path('', include(router.urls)),
    path('carts/subtract/<int:pk>/', CartQuantitySubtractView.as_view()),
]