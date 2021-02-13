from rest_framework import serializers

from cart.models import Cart
from products.models import Price



class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ('id', 'product',  'price')

   