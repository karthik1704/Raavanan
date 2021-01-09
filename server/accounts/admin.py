from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group

from .models import OneTimePassword, User 
# Register your models here.
class CustomUserAdmin(UserAdmin):
    model = User

    list_display = ('email', 'phone', 'username', 'pk', 'date_joined', 'last_login', 'is_superuser', 'is_staff')
    search_fields = ('email',)
    readonly_fields = ('date_joined', 'last_login')
    ordering = ('email',)
    filter_horizontal = ()
    list_filter = ()
    fieldsets = (
        ('Account Information', {
            'fields': ('username', 'email', 'phone', 'password'),
        }),
        ('Personal Information', {
            'fields': ('first_name','last_name', 'country'),
        }),
        ('Permissions', {
            'fields': ('is_superuser','is_active','is_staff'),
        }),
    )

    add_fieldsets = (
        (None, {
            'fields': ('username', 'email', 'phone', 'password1', 'password2'),
        }),
        ('Personal Information', {
            'fields': ('first_name','last_name', 'country'),
        }),
        ('Permissions', {
            'fields': ('is_superuser','is_active','is_staff'),
        }),
    )
    # fieldsets = (
    #     (None, {'fields': ('first_name','last_name',)}),
    #     ('Account Information', {'fields': ('username','email','phone',)}),
    # )
    # add_fieldsets = UserAdmin.add_fieldsets + (
    #     (None, {'fields': ('custom_field',)}),
    # )


admin.site.register(User, CustomUserAdmin)
#admin.site.register(PhoneConfirmation)
admin.site.register(OneTimePassword)

#admin.site.unregister(Group)