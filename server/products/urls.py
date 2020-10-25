from django.urls import path, include
from rest_framework import routers

from .views import ProductViewset

router = routers.DefaultRouter()
router.register('product', ProductViewset)

urlpatterns=[
    path('', include(router.urls))
]