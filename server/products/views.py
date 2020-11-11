from django.db.models import fields
from django.shortcuts import render
from rest_framework.relations import PrimaryKeyRelatedField

from .models import Product, ProductImage, ProductMaterial , Category

from rest_framework import viewsets, serializers

# Create your views here.

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id','image']


class ProductSerializer(serializers.ModelSerializer):
    category = PrimaryKeyRelatedField(queryset=Category.objects.all())
    #category = serializers.SlugRelatedField(many=True, read_only=True, slug_field='slug')
    images = ProductImageSerializer(many=True, read_only=True)
    class Meta:
        model= Product
        fields=['id','product_name', 'brand','manufacturer','imageurl', 'category', 'supported_devices','origin','description', 'images']


class ProductViewset(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    