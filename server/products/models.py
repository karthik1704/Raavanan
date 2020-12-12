from django.db import models

from django.utils.translation import ugettext_lazy as _

from mptt.models import MPTTModel, TreeForeignKey


# Create your models here.
class ProductMaterial(models.Model):
    material_name = models.CharField(max_length=30)

    def __str__(self):
        return self.material_name

class Category(MPTTModel):
    name = models.CharField(max_length=60)
    slug = models.SlugField()
    parent = TreeForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, related_name='children')

    class Meta:
        verbose_name_plural = "categories" 

    
    class MPTTMeta:
        order_insertion_by = ['name']

    def __str__(self):
        full_path = [self.name]                  
        k = self.parent
        while k is not None:
            full_path.append(k.name)
            k = k.parent
        return ' -> '.join(full_path[::-1])


    # def __str__(self) -> str:

    #     return self.name




class Product(models.Model):
    id = models.CharField(unique=True , db_index=True , max_length=15 , primary_key=True)
    product_name=models.CharField(max_length=255)
    mrp =  models.FloatField(_('M.R.P.'))
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
    imageurl = models.ImageField(upload_to=f'product/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.product_name
    
    def image(self):
        if not hasattr(self, '_productimage'):
            self._productimage = self.productimage_set.all()
        return self._productimage

class ProductImage(models.Model):
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    image = models.ImageField(upload_to=f'product/')