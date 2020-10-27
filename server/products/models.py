from django.db import models

from django.utils.translation import ugettext_lazy as _


# Create your models here.
class ProductMaterial(models.Model):
    material_name = models.CharField(max_length=30)

    def __str__(self):
        return self.material_name

class Category(models.Model):
    category_name = models.CharField(max_length=60)
    slug = models.SlugField()
    parent_category = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, related_name='children')

    class Meta:
        unique_together = ('slug', 'parent_category',)    
        verbose_name_plural = "categories" 

    def __str__(self):
        full_path = [self.category_name]                  
        k = self.parent_category
        while k is not None:
            full_path.append(k.category_name)
            k = k.parent_category
        return ' -> '.join(full_path[::-1])


class Product(models.Model):
    id = models.CharField(unique=True , db_index=True , max_length=15 , primary_key=True)
    product_name=models.CharField(max_length=255)
    mrp =  models.FloatField(_('MRP'))
    discount = models.IntegerField(_('Discount %'))
    price = models.FloatField()
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

class ProductImage(models.Model):
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    image = models.ImageField(upload_to=f'product/{product_id}/')