from django.db import models
from django.conf import settings
from django.utils.translation import ugettext_lazy as _

# Create your models here.

USER = settings.AUTH_USER_MODEL

class Address(models.Model):
    user = models.ForeignKey(USER, on_delete=models.DO_NOTHING)
    address1 = models.CharField(max_length=115)
    address2 = models.CharField(max_length=115)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    postal = models.CharField(max_length=20)
    phone = models.CharField(max_length=32)
    landmark = models.CharField(max_length=250)
    created = models.DateTimeField(_('created'), auto_now_add=True)