from django.db import models

from django.conf import settings
from products.models import Product

# Create your models here.
User = settings.AUTH_USER_MODEL

class Wishlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)