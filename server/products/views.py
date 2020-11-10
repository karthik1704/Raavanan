from django.db.models import fields
from django.shortcuts import render

from .models import Product, ProductImage, ProductMaterial , Category

from rest_framework import viewsets, serializers

# Create your views here.

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['product_id','image']


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model= Product
        fields=['id','product_name', 'brand','manufacturer','imageurl', 'supported_devices','origin','description']
class ProductViewset(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    