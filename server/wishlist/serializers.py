from itertools import product
from rest_framework import serializers

from .models import Wishlist

class WishlistSerializer(serializers.ModelSerializer):

    class Meta:
        model = Wishlist
        fields = '__all__'

    def create(self, validated_data):
        user = self.context['request'].user
        product = validated_data['product']
        wishlist = Wishlist(
            user=user,
            product=product
        )
        wishlist.save()
        return wishlist

    def update(self, instance, validated_data):
        #wishlist = instance.wishlist
        instance.user = self.context['request'].user
        instance.product = validated_data.get('product', instance.product)
        instance.save()
        # wishlist = Wishlist(
        #     user=user,
        #     product=product
        # )
        #wishlist.save()
        return instance
       