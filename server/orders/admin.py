from addresses.models import Address
from django.contrib import admin
from django.contrib.admin.utils import flatten_fieldsets

from .models import Order, OrderItem

# Register your models here.

    

class OrderItemAdmin(admin.StackedInline):
    model = OrderItem
    extra = 0
    can_delete = False
    
    readonly_fields = ('product', 'price', 'quantity')
    def has_change_permission(self, request, obj=None):
        return False
    # def get_readonly_fields(self, request, obj=None):
    #     if request.user.is_superuser:
    #         return self.readonly_fields

    #     if self.declared_fieldsets:
    #         return flatten_fieldsets(self.declared_fieldsets)
    #     else:
    #         return list(set(
    #             [field.name for field in self.opts.local_fields] +
    #             [field.name for field in self.opts.local_many_to_many]
    #         ))

class OrderAdmin(admin.ModelAdmin):
    inlines = (OrderItemAdmin,)
    exclude = ('address',)
    readonly_fields = ('user', 'total_price', 'payment_id', 'extra', 'transaction_status','delivery_address',)

    def delivery_address(self,instance):
        address = Address.objects.get(id = instance.address.id)
        return f"""
        {address.name},
        {address.address1},
        {address.address2},
        {address.city},
        {address.state},
        {address.country},
        Postal Code: {address.postal},
        Phone: {address.phone}.
        """
    

admin.site.register(Order, OrderAdmin)