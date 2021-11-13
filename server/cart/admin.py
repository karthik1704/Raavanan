from django.contrib import admin

from .models import Cart 

# Register your models here.
# class CartItemAdmin(admin.StackedInline):
#     model = CartItem
    

class CartAdmin(admin.ModelAdmin):
    #inlines = (CartItemAdmin,)
    list_display = ('id','user','product','quantity' )

admin.site.register(Cart, CartAdmin)