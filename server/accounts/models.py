from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
#from django.core import validators
from django.utils.translation import ugettext_lazy as _

from  .manager import MyUserManager

# Create your models here.
class MyUser(AbstractBaseUser):
    
    first_name = models.CharField(_('first name'), max_length=30)
    last_name = models.CharField(_('last name'), max_length=30)
    email = models.EmailField(_('email address'), unique=True, db_index=True, )
    phone = models.CharField(_('phone number'),  max_length=20 )
    date_joined = models.DateTimeField(_('date joined'), auto_now_add=True)
    last_login = models.DateTimeField(_('last login'), auto_now=True)
    is_active = models.BooleanField(_('active'), default=True)
    is_staff = models.BooleanField(_('staff'), default=False)
    is_superuser = models.BooleanField(_('superuser'), default=False)

    
    USERNAME_FIELD = 'email' 
    REQUIRED_FIELDS = [ 'phone', 'first_name']

    objects = MyUserManager()


    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')
    
    def __str__(self) -> str:
        return self.first_name + ' ' +self.last_name

      # this methods are require to login super user from admin panel
    def has_perm(self, perm, obj=None):
        return self.is_superuser

    # this methods are require to login super user from admin panel
    def has_module_perms(self, app_label):
        return self.is_superuser