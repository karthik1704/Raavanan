from django.contrib import admin

from .models import Cart , CartItem

# Register your models here.
class CartItemAdmin(admin.StackedInline):
    model = CartItem
    

class CartAdmin(admin.ModelAdmin):
    inlines = (CartItemAdmin,)
    list_display = ('id', )

admin.site.register(Cart, CartAdmin)