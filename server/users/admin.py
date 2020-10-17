from django.contrib import admin

from users.models import User

# Register your models here.
class UserAdmin(admin.ModelAdmin):
   date_hierarchy = 'date_joined'

admin.site.register(User, UserAdmin)