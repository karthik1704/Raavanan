from django.urls import path, include
from rest_framework import routers

from .views import (
    CategoryViewSet,
    ProductViewset
)

router = routers.DefaultRouter()
router.register('product', ProductViewset)
router.register('category', CategoryViewSet)

urlpatterns=[
    path('', include(router.urls))
]