from django.contrib import admin

from .models import Category, Product, ProductMaterial

# Register your models here.
# class CategoryAdmin(admin.StackedInline):
#     model = Category

# class ProductMaterialAdmin(admin.StackedInline):
#     model = ProductMaterial

# class ProductAdmin(admin.ModelAdmin):
#     inlines = (CategoryAdmin, ProductMaterialAdmin)

admin.site.register(Product)
admin.site.register(Category)
admin.site.register(ProductMaterial)