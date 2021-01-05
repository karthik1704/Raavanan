from django.db import models
from django.contrib.auth.models import AbstractBaseUser

from django.utils.translation import ugettext_lazy as _

from .manager import UserManager, PhoneConfirmationManager
# Create your models here.

class User(AbstractBaseUser):

    username = models.CharField(_('Username'),unique=True,blank=True, null=True, max_length=10)
    email = models.EmailField(_('e-mail'), unique=True, blank=True, null=True)
    phone = models.CharField(
        _('phone number'),
        unique=True,
        max_length=30,
        blank=True, 
        null=True
    )

    first_name = models.CharField(_('first name'), max_length=50)
    last_name = models.CharField(_('last name'), max_length=50)
    birth_year = models.CharField(_('birth year'), max_length=4)
    country = models.CharField(_('country'), max_length=5)

    date_joined = models.DateTimeField(_('date joined'), auto_now_add=True)
    last_login = models.DateTimeField(_('last login'), auto_now=True)
    is_active = models.BooleanField(_('active'), default=True)
    is_staff = models.BooleanField(_('staff'), default=False)
    is_superuser = models.BooleanField(_('superuser'), default=False)
    
    USERNAME_FIELD = 'username'
    EMAIL_FIELD = "email"
    REQUIRED_FIELDS = ['email','phone']

    objects = UserManager()

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')
    
 
    # def get_email_field_name(self):
    #     return self.EMAIL_FIELD
    
    def get_full_name(self):
        return self.first_name + ' ' + self.last_name

    def get_short_name(self):
        return self.first_name

    def __str__(self) -> str:
        return self.first_name + ' ' +self.last_name

    # this methods are require to login super user from admin panel
    def has_perm(self, perm, obj=None):
        return self.is_superuser

    # this methods are require to login super user from admin panel
    def has_module_perms(self, app_label):
        return self.is_superuser



class PhoneConfirmation(models.Model):

    phone = models.ForeignKey(User,on_delete=models.CASCADE)
    created = models.DateTimeField(_('created'), auto_now_add=True)
    sent = models.DateTimeField(_('sent'),null= True, auto_now=True)
    otp = models.CharField(_('OTP'), max_length=8, unique=True)

    objects = PhoneConfirmationManager()

    class Meta:
        verbose_name = _("Phone OTP confirmation")
        verbose_name_plural = _("Phone OTP confirmations")

    def __str__(self):
        return self.phone.first_name

    
  