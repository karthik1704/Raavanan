from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend


from .serializers import CategorySerializer, ProductSerializer
from .models import Category, Product

# Create your views here.
class ProductViewset(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category__slug', 'category__parent_category' ]
    ordering_fields = ['created_at']
    ordering = ['-created_at']

  
        

    

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filterset_fields = ['category_name', 'parent_category']

    