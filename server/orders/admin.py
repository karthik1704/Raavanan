from django.contrib import admin

from .models import Order, OrderItem, OrderItemExtra

# Register your models here.

class OrderItemExtraAdmin(admin.StackedInline):
    model = OrderItemExtra
    

class OrderItemAdmin(admin.StackedInline):
    model = OrderItem
    inlines = (OrderItemExtraAdmin,)

admin.site.register(OrderItem , OrderItemAdmin)

class OrderAdmin(admin.ModelAdmin):
    inlines = (OrderItemAdmin,)


admin.site.register(Order, OrderAdmin)