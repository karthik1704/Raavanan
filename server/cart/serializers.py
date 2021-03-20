from rest_framework import serializers

from cart.models import Cart
from products.models import Price


class CartListSerializer(serializers.ListSerializer):

    def create(self, validated_data):
        print("create")
        carts = [Cart(**item) for item in validated_data]
        return Cart.objects.bulk_create(carts)


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        # list_serializer_class = CartListSerializer
        fields = ('id', 'product',  'price', 'quantity')
        # read_only_fields = ('quantity',)

class CartUpdateSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=False)
    class Meta:
        model = Cart
        fields = ('id', 'product',  'price', 'quantity')
        read_only_fields = ('quantity',)



class CartQuantityUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ('id', 'product',  'price', 'quantity')
        read_only_fields = ('product',  'price', 'quantity',)