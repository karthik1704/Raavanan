
from rest_framework import  serializers

from rest_framework_recursive.fields import RecursiveField

from .models import Price, Product, ProductImage, ProductMaterial , Category


# Create your views here.

class ParentCategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Category
        fields = ['id','name', 'slug','parent','order_value','imageurl']

class CategorySerializer(serializers.ModelSerializer):
    children = RecursiveField(many=True)
    parent = ParentCategorySerializer()
    class Meta:
        model = Category
        fields = ['id','name', 'slug', 'parent', 'children','order_value','imageurl']

# CategorySerializer._declared_fields['children'] = CategorySerializer(
#     many=True,
#     source='get_children',
# )



class ProductImageSerializer(serializers.ModelSerializer):
    original = serializers.ReadOnlyField(source='image')
    thumbnail = serializers.ReadOnlyField(source='image')
    class Meta:
        model = ProductImage
        fields = ['id','image', 'original' , 'thumbnail']



class ProductMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductMaterial
        fields = ['id','material_name']

class ProductPriceSerializer(serializers.ModelSerializer):
    material = ProductMaterialSerializer(many=True)
    class Meta:
        model = Price
        fields = ['id', 'types', 'material', 'mrp', 'discount', 'price']

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
            'slug',
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
            'other_information'
        ]
        lookup_field = 'slug'
        extra_kwargs = {
            'url': {'lookup_field': 'slug'}
        }
 

class PriceDetailSerializer(serializers.ModelSerializer):

    class Meta: 
        model = Price
        fields = '__all__'