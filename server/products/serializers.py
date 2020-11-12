
from .models import Product, ProductImage, ProductMaterial , Category

from rest_framework import  serializers

# Create your views here.


class CategorySerializer(serializers.ModelSerializer):
    parent_category = serializers.StringRelatedField()
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
    image = ProductImageSerializer(many=True)
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
            'image',

        ]
 
