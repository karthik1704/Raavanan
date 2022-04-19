from rest_framework import serializers
from addresses.serializer import AddressSerializer
from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = OrderItem
        # fields = ['pk' ]
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    # address = AddressSerializer(many=False)
    items = OrderItemSerializer(many=True)
    class Meta:
        model = Order       
        fields = ['id','created_at','order_status','transaction_status','total_price', 'extra','address','items','delivery_charge']

    def create(self, validated_data): 
        items = validated_data['items']    
        del validated_data['items']    
        order =  Order.objects.create(**validated_data)
        for item in items:
            item['order_id'] = order.id
            OrderItem.objects.create(**item)
        return order


