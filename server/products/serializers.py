
from rest_framework import  serializers

from rest_framework_recursive.fields import RecursiveField

from .models import Price, Product, ProductImage, ProductMaterial , Category, Size


# Create your views here.

class ParentCategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Category
        fields = ['id','name', 'slug','parent']

class CategorySerializer(serializers.ModelSerializer):
    children = RecursiveField(many=True)
    parent = ParentCategorySerializer()
    class Meta:
        model = Category
        fields = ['id','name', 'slug', 'parent', 'children']

# CategorySerializer._declared_fields['children'] = CategorySerializer(
#     many=True,
#     source='get_children',
# )



class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id','image']



class ProductMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductMaterial
        fields = ['id','material_name']

class ProductSizeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Size
        fields = '__all__'

class ProductPriceSerializer(serializers.ModelSerializer):
    material = ProductMaterialSerializer(many=True)
    size = ProductSizeSerializer()
    class Meta:
        model = Price
        fields = ['id', 'types', 'material', 'size','mrp', 'discount', 'price']

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    image = ProductImageSerializer(many=True)
    materials = ProductMaterialSerializer(many=True)
    price = ProductPriceSerializer(many=True)
    class Meta:
        model= Product
        fields=[
            'id',
            'name',
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
            'created_at',

        ]
 

class PriceDetailSerializer(serializers.ModelSerializer):

    class Meta: 
        model = Price
        fields = '__all__'