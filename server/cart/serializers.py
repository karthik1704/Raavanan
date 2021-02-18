from rest_framework import serializers

from cart.models import Cart
from products.models import Price


class CartListSerializer(serializers.ListSerializer):

    # class Meta:
    #     model = Cart
    #     fields = ('id', 'product',  'price')


    def create(self, validated_data):
        carts = [Cart(**item) for item in validated_data]
        return Cart.objects.bulk_create(carts)


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        list_serializer_class = CartListSerializer
        fields = ('id', 'product',  'price', 'quantity')
        read_only_fields = ('quantity',)

   