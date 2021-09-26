from django.urls import path, include
from rest_framework import routers

from .views import (
    CartUpdateOrCreateView, CartViewSet,
    CartQuantityAddView,
    CartQuantitySubtractView,
    CartMutipleCreateView,
    CartList,
    CartSyncView
    
)

router = routers.DefaultRouter()
router.register('carts', CartViewSet, basename='cart')

urlpatterns = [
    path('', include(router.urls)),
    path('carts/create/sync/', CartMutipleCreateView.as_view()),
    # path('sync_cart/', CartList.as_view()),
    path('carts/updateorcreate/', CartUpdateOrCreateView.as_view()),
    path('carts/create/multi/', CartMutipleCreateView.as_view()),
    path('carts/add/<int:pk>/', CartQuantityAddView.as_view()),
    path('carts/subtract/<int:pk>/', CartQuantitySubtractView.as_view()),
    path('sync_cart/', CartSyncView.as_view()),
]