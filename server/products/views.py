from django.db.models import query
from rest_framework import viewsets
from rest_framework import generics
from django.db.models import Q
from rest_framework.generics import RetrieveAPIView
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from django.http import HttpResponse
from .serializers import CategorySerializer, PriceDetailSerializer, ProductSerializer
from .models import Category, Price, Product
from django.conf import settings


# Create your views here.
class ProductViewset(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend,filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category__slug', 'category__parent', 'category__parent__parent','slug']
    search_fields = ['product_name','category__name']
    ordering_fields = ['created_at']
    ordering = ['-created_at']
    lookup_fields = ('slug','pk')  

    def retrieve(self, request, *args, **kwargs):
        ids = self.kwargs.get('pk', None)
        if ids is not None:                       
            if not ids.isnumeric() :
                queryset = Product.objects.filter(slug=ids)                
                if queryset:
                    serializer = ProductSerializer(queryset[0], many=False)                       
                    item = serializer.data.copy()
                    item['imageurl'] = '%s%s' % (self.request._current_scheme_host,  item['imageurl'])                    
                    return Response(item)
                
        return super(ProductViewset, self).retrieve(request, *args, **kwargs)




class CustomProductsList(generics.ListAPIView):
    queryset = Product.objects.none()
    serializer_class=ProductSerializer

    def get_queryset(self):
        ids = self.request.query_params.get('ids', None)

        if ids is not None:
            ids = [int(x) for x in ids.split(',')]
            queryset = Product.objects.filter(pk__in=ids)
        else:
             queryset = Product.objects.none()
        return queryset
  
class CustomProductsList(generics.ListAPIView):
    queryset = Product.objects.none()
    serializer_class=ProductSerializer

    def get_queryset(self):
        ids = self.request.query_params.get('ids', None)

        if ids is not None:
            ids = [int(x) for x in ids.split(',')]
            queryset = Product.objects.filter(pk__in=ids)
        else:
             queryset = Product.objects.none()
        return queryset
  
        

    

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.filter(level=0)
    serializer_class = CategorySerializer
    filterset_fields = ['slug', 'parent']



class PriceDetailView(RetrieveAPIView):
    queryset = Price.objects.all()
    serializer_class = PriceDetailSerializer
