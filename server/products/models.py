from django.db import models

from django.utils.translation import ugettext_lazy as _

from mptt.models import MPTTModel, TreeForeignKey


# Create your models here.
class ProductMaterial(models.Model):
    material_name = models.CharField(max_length=150)

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
    product_id = models.CharField(unique=True , max_length=15 )
    name=models.CharField(max_length=255)
    slug=models.CharField(max_length=255, null=True, unique=True)
    brand=models.CharField(max_length=50)
    manufacturer=models.CharField(max_length=50)
    supported_devices = models.CharField(max_length=100)
    quantity = models.IntegerField(blank=True, null=True)
    materials = models.ManyToManyField(ProductMaterial)
    category = models.ForeignKey(Category, on_delete=models.DO_NOTHING)
    origin = models.CharField(max_length=150)
    description = models.TextField()
    imageurl = models.ImageField(upload_to=f'product/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.name
    
    def image(self):
        if not hasattr(self, '_productimage'):
            self._productimage = self.productimage_set.all()
        return self._productimage

    def price(self):
        if not hasattr(self, '_price'):
            self._price =  self.price_set.all()
            return self._price


class Price(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    material = models.ForeignKey(ProductMaterial, on_delete=models.DO_NOTHING, null=True, blank=True)
    types = models.CharField(max_length=255, blank=True, null=True)
    mrp =  models.FloatField(_('M.R.P.'))
    discount = models.IntegerField(_('Discount %'))
    price = models.FloatField()


class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    image = models.ImageField(upload_to=f'product/')