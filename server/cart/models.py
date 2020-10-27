from django.db import models

from products.models import Product

from django.contrib.auth import get_user_model

# Create your models here.
User = get_user_model()

class Cart(models.Model):
    user = models.ForeignKey(User,on_delete= models.CASCADE)
    created_at = models.DateTimeField(auto_now=True)

class CartItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    total_price = models.FloatField(blank=True)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)

    