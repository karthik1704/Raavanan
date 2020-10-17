from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.core import validators
from django.utils.translation import ugettext_lazy as _

from users.manager import PhoneAndEmailUserManager

# Create your models here.
class User(AbstractBaseUser,PermissionsMixin):

    username = models.CharField( _('email or phone'), max_length=255, unique=True, db_index=True,
        help_text=_('Required. 255 characters or fewer. Letters, digits and '
                    '@/./+/-/_ only.'),
        validators=[validators.RegexValidator(
            r'^[\w.@+-]+$', _(
                'Enter a valid username. '
                'This value may contain only letters, numbers '
                'and @/./+/-/_ characters.'
            ), 'invalid'),
        ],
        error_messages={
            'unique': _("A user with that username already exists."),
        })
    email = models.EmailField(_('email address'),unique=True , blank=True )
    phone = models.CharField(_('phone number'),unique=True , blank=True ,max_length=20 )
    date_joined = models.DateTimeField(_('date joined'), auto_now_add=True)
    is_active = models.BooleanField(_('active'), default=True)
    is_staff = models.BooleanField(_('staff'), default=False)
    is_superuser = models.BooleanField(_('superuser'), default=False)

    USERNAME_FIELD= 'username' 
    REQUIRED_FIELDS = []

    objects = PhoneAndEmailUserManager()


    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    # def has_module_perms(self, obj=None):
    #     return True

    # def has_perm(self, obj=None):
    #     return True


class Profile(models.Model):
    user_id = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name= models.CharField(_('first name'),max_length=50)
    last_name= models.CharField(_('last name'),max_length=50)
    birth_year=models.CharField(_('birth year'),max_length=4, null=True, blank=True)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
