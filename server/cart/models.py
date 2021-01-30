from django.db import models

from products.models import Product

from django.conf import settings

# Create your models here.
User = settings.AUTH_USER_MODEL

class Cart(models.Model):
    user = models.ForeignKey(User,on_delete= models.CASCADE)
    created_at = models.DateTimeField(auto_now=True)

class CartItem(models.Model):
    user = models.ForeignKey(User,on_delete= models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    total_price = models.FloatField(blank=True)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)

    # @property
    # def sub_total(self):
    #     return self.product.price * self.quantity
