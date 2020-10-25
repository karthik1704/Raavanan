from django.db import models

# Create your models here.
class ProductMaterial(models.Model):
    material_name = models.CharField(max_length=30)

    def __str__(self):
        return self.material_name

class Category(models.Model):
    category_name = models.CharField(max_length=60)

    def __str__(self):
        return self.category_name


class Product(models.Model):
    id = models.CharField(unique=True , db_index=True , max_length=15 , primary_key=True)
    product_name=models.CharField(max_length=255)
    brand=models.CharField(max_length=50)
    manufacturer=models.CharField(max_length=50)
    supported_devices = models.CharField(max_length=100)
    quantity = models.IntegerField(blank=True, null=True)
    materials = models.ManyToManyField(ProductMaterial)
    category = models.ForeignKey(Category, on_delete=models.DO_NOTHING)
    origin = models.CharField(max_length=20)
    description = models.TextField()
    imageurl = models.ImageField(upload_to='product/', blank=True, null=True)


    def __str__(self):
        return self.product_name