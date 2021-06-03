from django.urls import path, include
from rest_framework import routers

from .views import (
    OrderConfirmView,
    OrderView,
    OrderDetailView

)

router = routers.DefaultRouter()
# router.register('orders', OrderViewset, basename='orders')

urlpatterns = [
    path('', include(router.urls)),    
    path('orders/', OrderView.as_view()),
    path('order_confirm/', OrderConfirmView.as_view()),
    path('order_detail/<slug:order_no>/', OrderDetailView.as_view()),
   
]