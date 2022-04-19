from django.db.models import query
from rest_framework import viewsets
from rest_framework import generics
from django.db.models import Q
from rest_framework.generics import RetrieveAPIView
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, BasePermission, AllowAny

from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from django.http import HttpResponse
from .serializers import CategorySerializer, PriceDetailSerializer, ProductSerializer
from .models import Category, Price, Product, Courier
from django.conf import settings

from rest_framework.pagination import PageNumberPagination

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 1000
# Create your views here.
class ProductViewset(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend,filters.SearchFilter, filters.OrderingFilter]
    # filterset_fields = ['category__slug', 'category__parent', 'category__parent__parent','slug']
    search_fields = ['product_name','category__name']
    ordering_fields = ['created_at']
    ordering = ['-created_at']
    lookup_fields = ('slug','pk')  
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        category_s = self.request.query_params.get('category__slug', None)
        
        cats = Category.objects.filter(slug = category_s)

        
        if category_s is not None:
            categories = cats.get_descendants(include_self=True)
            queryset = Product.objects.filter(category__in = categories)
        else:
            queryset = Product.objects.all()
        
        return queryset

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

    # def get_queryset(self):
    #     print(self.request.query_params)
    #     ids = self.request.query_params.get('category__slug', None)
    #     if ids is not None:
    #         # ids = [int(x) for x in ids.split(',')]
            
    #         queryset = Product.objects.filter(category__parent_category__in=['phone-cases'])
    #     else:
    #          queryset = Product.objects.none()
    #     return queryset


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
    queryset = Category.objects.filter(level=0).order_by('order_value')
    # queryset = Category.objects.all()
    
    serializer_class = CategorySerializer
    # filterset_fields = ['id','slug', 'parent','order_value', 'imageurl']
    ordering = ('order_value')

    # def retrieve(self, request, *args, **kwargs):        
    #     ids = self.kwargs.get('pk', None)
    #     if ids is not None:                       
    #         if not ids.isnumeric() :
    #             queryset = Category.objects.filter(slug=ids)                
    #             if queryset:
    #                 serializer = CategrySerializer(queryset[0], many=False)                       
    #                 item = serializer.data.copy()
    #                 item['imageurl'] = '%s%s' % (self.request._current_scheme_host,  item['imageurl'])                    
    #                 return Response(item)
                
        # return super(ProductViewset, self).retrieve(request, *args, **kwargs)


class PriceDetailView(RetrieveAPIView):
    queryset = Price.objects.all()
    serializer_class = PriceDetailSerializer

class CourierViewSet(viewsets.ModelViewSet):
    queryset = Courier.objects.filter()

class CourierView(APIView):
    """
    List all orders, or create a new snippet.
    """
    authentication_classes=[]
    permission_classes = [AllowAny]
    def post(self, request, format=None):        
        try:                    
            cour = request.data.get('weight')
            courier_obj = Courier.objects.filter(weight_upto__gte = cour).order_by('weight_upto')[:1]            
            charge = courier_obj[0].price
            return Response({"charge" :charge}, status=status.HTTP_201_CREATED)
        except Exception as  e:
            return Response(e, status=status.HTTP_400_BAD_REQUEST)
    