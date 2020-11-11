from django.db.models import fields
from django.shortcuts import render
from rest_framework.relations import PrimaryKeyRelatedField, StringRelatedField

from .models import Product, ProductImage, ProductMaterial , Category

from rest_framework import viewsets, serializers

# Create your views here.


class CategorySerializer(serializers.ModelSerializer):
    parent_category = StringRelatedField()
    class Meta:
        model = Category
        fields = ['id','category_name', 'parent_category']

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id','image']


class ProductMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductMaterial
        fields = ['id','material_name']

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    #category = serializers.SlugRelatedField(many=True, read_only=True, slug_field='slug')
    #images = PrimaryKeyRelatedField()
    materials = ProductMaterialSerializer(many=True)
    class Meta:
        model= Product
        fields=['id','product_name', 'brand','manufacturer','imageurl', 'category', 'materials', 'supported_devices','origin','description']


class ProductViewset(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    