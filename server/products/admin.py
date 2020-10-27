from django.contrib import admin

from .models import Category, Product, ProductMaterial, ProductImage

# Register your models here.
# class CategoryAdmin(admin.StackedInline):
#     model = Category

# class ProductMaterialAdmin(admin.StackedInline):
#     model = ProductMaterial

class ProductImageAdmin(admin.StackedInline):
    model = ProductImage
    extra = 3

class ProductAdmin(admin.ModelAdmin):
    inlines = (ProductImageAdmin,)

admin.site.register(Product, ProductAdmin)
admin.site.register(Category)
admin.site.register(ProductMaterial)