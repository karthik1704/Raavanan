from django.urls import path, include
from rest_framework import routers

from .views import (
    CategoryViewSet, PriceDetailView,
    CustomProductsList,
    ProductViewset,
    CourierViewSet,
    CourierView
)

router = routers.DefaultRouter()
router.register('product', ProductViewset)
router.register('category', CategoryViewSet)
router.register('Courier', CourierViewSet)

urlpatterns=[
    path('', include(router.urls)),
    path('custom/products/', CustomProductsList.as_view()),
    path('price/<int:pk>/', PriceDetailView.as_view()),
    path('calculate_delivery/', CourierView.as_view())
]