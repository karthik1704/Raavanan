from django.contrib import admin

from .models import Product,ProductCategory,SubCategory
# Register your models here.
admin.site.register(Product)
admin.site.register(ProductCategory)
admin.site.register(SubCategory)
