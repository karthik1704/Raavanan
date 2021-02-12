from rest_framework import viewsets
from rest_framework.generics import RetrieveAPIView
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend


from .serializers import CategorySerializer, PriceDetailSerializer, ProductSerializer
from .models import Category, Price, Product

# Create your views here.
class ProductViewset(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend,filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category__slug', 'category__parent', 'category__parent__parent' ]
    search_fields = ['product_name','category__name']
    ordering_fields = ['created_at']
    ordering = ['-created_at']

  
        

    

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.filter(level=0)
    serializer_class = CategorySerializer
    filterset_fields = ['slug', 'parent']





class PriceDetailView(RetrieveAPIView):
    queryset = Price.objects.all()
    serializer_class = PriceDetailSerializer