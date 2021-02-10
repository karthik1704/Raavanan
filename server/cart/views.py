from django.shortcuts import render

from rest_framework.generics import GenericAPIView
from rest_framework import viewsets 
from rest_framework.permissions import IsAuthenticated, BasePermission


from .models import Cart
from .serializers import CartSerializer
# Create your views here.

class IsOwner(BasePermission):

    """
    Custom permission to only allow owners of an object to edit it.
    """
    # def has_permission(self, request, view):
    #     return request.user and request.user.is_authenticated()

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user 


class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        queryset = Cart.objects.filter(user=self.request.user)
        return queryset

    def perform_create(self, serializer):
        serializer.validated_data['user'] = self.request.user 
        return super(CartViewSet, self).perform_create(serializer)

    def perform_update(self, serializer):
        serializer.validated_data['user'] = self.request.user
        return super(CartViewSet, self).perform_update(serializer)