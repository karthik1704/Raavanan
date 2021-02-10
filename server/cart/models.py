from django.db import models

from products.models import Price, Product

from django.conf import settings

# Create your models here.
User = settings.AUTH_USER_MODEL

class Cart(models.Model):
    user = models.ForeignKey(User,on_delete= models.CASCADE)
    created_at = models.DateTimeField(auto_now=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    price = models.ForeignKey(Price, on_delete=models.CASCADE)

    
