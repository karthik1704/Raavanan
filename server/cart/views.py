from django.shortcuts import render

from rest_framework.generics import GenericAPIView
from rest_framework import viewsets 

from .models import Cart
from .serializers import CartSerializer
# Create your views here.
class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer(user = self.request.user)