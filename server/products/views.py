from django.shortcuts import render

from .models import Product, ProductMaterial , Category

from rest_framework import viewsets, serializers

# Create your views here.

class ProductSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model= Product
        fields=['id','product_name', 'brand','manufacturer','imageurl','supported_devices','origin','description' ]

class ProductViewset(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    