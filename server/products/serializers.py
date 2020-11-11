from rest_framework import  serializers
from rest_framework.relations import PrimaryKeyRelatedField, StringRelatedField

from .models import Product, ProductImage, ProductMaterial , Category


class CategorySerializer(serializers.ModelSerializer):
    parent_category = StringRelatedField(many=True)
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
        fields=[
            'id',
            'product_name',
            'mrp',
            'price',
            'brand',
            'manufacturer',
            'imageurl',
            'quantity',
            'supported_devices',
            'origin',
            'description',
            'category',
            'materials',
        ]

