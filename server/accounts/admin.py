from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import MyUser

# Register your models here.
class MyUserAdmin(UserAdmin):

    model = MyUser

    list_display = ('email', 'pk', 'date_joined', 'last_login', 'is_superuser', 'is_staff')
    search_fields = ('email',)
    readonly_fields = ('date_joined', 'last_login')
    ordering = ('email',)
    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()
    add_fieldsets = (
        (None, {
            'fields': ('email','password1','password2'),
        }),
        ('Personal Information', {
            'fields': ('first_name','last_name', 'phone'),
        }),
        ('Permissions', {
            'fields': ('is_superuser','is_active','is_staff'),
        }),
    )


admin.site.register(MyUser, MyUserAdmin)