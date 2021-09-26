from django.contrib import admin

from mptt.admin import MPTTModelAdmin

from .models import Category, Price, Product, ProductMaterial, ProductImage

# Register your models here.
# class CategoryAdmin(admin.StackedInline):
#     model = Category

# class ProductMaterialAdmin(admin.StackedInline):
#     model = ProductMaterial

class ProductImageAdmin(admin.StackedInline):
    model = ProductImage
    extra = 3

class ProductPriceAdmin(admin.StackedInline):
    model = Price
    extra = 1

class ProductAdmin(admin.ModelAdmin):
    inlines = (ProductPriceAdmin, ProductImageAdmin, )
    list_display = ('pk', 'name', 'brand')

admin.site.register(Product, ProductAdmin)
admin.site.register(Category, MPTTModelAdmin)
admin.site.register(ProductMaterial)
