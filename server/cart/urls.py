from django.urls import path, include
from rest_framework import routers

from .views import (
    CartUpdateOrCreateView, CartViewSet,
    CartQuantityAddView,
    CartQuantitySubtractView,
    CartMutipleCreateView,
)

router = routers.DefaultRouter()
router.register('carts', CartViewSet, basename='cart')

urlpatterns = [
    path('', include(router.urls)),
    path('carts/updateorcreate/', CartUpdateOrCreateView.as_view()),
    path('carts/create/multi/', CartMutipleCreateView.as_view()),
    path('carts/add/<int:pk>/', CartQuantityAddView.as_view()),
    path('carts/subtract/<int:pk>/', CartQuantitySubtractView.as_view()),
]