from django.db import models

# Create your models here.


class ProductCategory(models.Model):
    category_name = models.CharField(max_length=20)

    def __str__(self) -> str:
        return self.category_name

class SubCategory(models.Model):
    category_id = models.ForeignKey(ProductCategory,on_delete=models.CASCADE)
    SubCategory_Name = models.CharField(max_length=30)  

    def __str__(self) -> str:
        return self.SubCategory_Name

class Product(models.Model):
    product_name = models.CharField(max_length=200)
    category_id = models.ForeignKey(ProductCategory, on_delete=models.CASCADE)
    
    def __str__(self) -> str:
        return self.product_name