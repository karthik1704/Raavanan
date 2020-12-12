from django.shortcuts import render
from  rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated


from .models import Order
from .serializers import OrderSerializer
# Create your views here.


class OrderViewset(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        queryset = Order.objects.filter(user=self.request.user)
        return queryset