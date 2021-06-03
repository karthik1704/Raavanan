from django.db import models
# from django.contrib.auth import get_user_model
from django.conf import settings
from products.models import Product
from products.models import Price
from addresses.models import Address

# Create your models here.

User = settings.AUTH_USER_MODEL
ORDER_CHOICES = (
    ('Processing','Processing'),
    ('Placed', 'Placed'),
    ('In transit','In transit'),
    ('Delivered','Delivered'),
    ('Cancelled','Cancelled'),
)
TRANSACTION_CHOICES = (
    ('Waiting','Waiting'),
    ('PENDING', 'PENDING'),
    ('TXN_SUCCESS','TXN_SUCCESS'),
    ('TXN_FAILURE','TXN_FAILURE'),
    
)

class Order(models.Model):
    user = models.ForeignKey(User,on_delete=models.DO_NOTHING)
    total_price = models.FloatField()
    payment_id = models.CharField(max_length=80)
    created_at = models.DateTimeField(auto_now_add=True)
    extra = models.CharField(max_length=80, null=True, blank=True)
    address =  models.ForeignKey(Address,on_delete=models.DO_NOTHING, null=True)
    order_status = models.CharField(max_length=40, choices=ORDER_CHOICES, default='Processing')
    transaction_status = models.CharField(max_length=40, choices=TRANSACTION_CHOICES, default='Waiting')

    def items(self):
        if not hasattr(self, '_items'):
            self._items =  self.orderitem_set.all()
            return self._items


class OrderItem(models.Model):
    # user = models.ForeignKey(User,on_delete=models.DO_NOTHING)
    order = models.ForeignKey(Order, on_delete=models.DO_NOTHING, null=True)
    product = models.ForeignKey(Product,on_delete=models.DO_NOTHING,null=True)
    price = models.ForeignKey(Price,on_delete=models.DO_NOTHING, null=True)
    quantity = models.IntegerField(null=True)
    
   


    