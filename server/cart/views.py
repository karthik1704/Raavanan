from django.shortcuts import render
from rest_framework import request

from rest_framework.generics import RetrieveUpdateDestroyAPIView, CreateAPIView

from rest_framework import viewsets 
from rest_framework.permissions import IsAuthenticated, BasePermission

from django.http import Http404
from rest_framework.response import Response
from rest_framework.request import clone_request
from rest_framework import status
from rest_framework.decorators import api_view
# import json
from .models import Cart
from .serializers import (
    CartSerializer,
    CartUpdateSerializer,
    CartQuantityUpdateSerializer, 
   
)
# from snippets.models import Snippet
# from snippets.serializers import SnippetSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class CartList(APIView):
    """
    List all carts, or create a new snippet.
    """
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        snippets = Cart.objects.all()
        serializer = CartSerializer(snippets, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = CartSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





# Create your views here.

class IsOwner(BasePermission):

    """
    Custom permission to only allow owners of an object to edit it.
    """
    # def has_permission(self, request, view):
    #     return request.user and request.user.is_authenticated()

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user 

class AllowPUTAsCreateMixin(object):
    """
    The following mixin class may be used in order to support PUT-as-create
    behavior for incoming requests.
    """
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object_or_none()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        if instance is None:
            lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field
            lookup_value = self.kwargs[lookup_url_kwarg]
            extra_kwargs = {self.lookup_field: lookup_value}
            serializer.save(**extra_kwargs)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        serializer.save()
        return Response(serializer.data)

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)

    def get_object_or_none(self):
        try:
            return self.get_object()
        except Http404:
            if self.request.method == 'PUT':
                # For PUT-as-create operation, we need to ensure that we have
                # relevant permissions, as if this was a POST request.  This
                # will either raise a PermissionDenied exception, or simply
                # return None.
                self.check_permissions(clone_request(self.request, 'POST'))
            else:
                # PATCH requests where the object does not exist should still
                # return a 404 response.
                raise

# ? put as create getting permission defined , Why?
# TODO: find a way to overcame waring
# TODO: or Create new view for put as create
# TODO: Mutiple carts Items add view



class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        queryset = Cart.objects.filter(user=self.request.user)
        return queryset

    def perform_create(self, serializer): 
        serializer.validated_data['user'] = self.request.user
        return super(CartViewSet, self).perform_create(serializer)

    def perform_update(self, serializer):
        serializer.validated_data['user'] = self.request.user
        serializer.validated_data['quantity'] =  self.get_object().quantity + 1
        return super(CartViewSet, self).perform_update(serializer)

class CartMutipleCreateView(CreateAPIView):

    # ! Mutiple carts Items add  view
    """ 
    To Use Multi Create send data as array of objects

    EXAMPLE:
        [
        {
            "product": 12,
            "price": 1
        },
        {
            "product": 12,
            "price": 1
        }
        ]
    """
    #queryset = Cart.objects.none()
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        print("queryset")
        queryset = Cart.objects.filter(user=self.request.user)
        return queryset
    
    def get_serializer(self, *args, **kwargs):
        print("get_serializer")
        # if isinstance(kwargs.get('data', {}), list):
        kwargs['many'] = True
        # print(super(CartMutipleCreateView, self).get_serializer(*args, **kwargs))
        k = super(CartMutipleCreateView, self).get_serializer(*args, **kwargs)
        return k
        


    def perform_create(self, serializer): 
        print('perform create')
        carts = self.get_queryset()
        print('carts')
        # output_dict = dict(serializer.validated_data)
        # print(dict(serializer.validated_data))
        # dict(serializer.validated_data)
        
        # item = dict(serializer.validated_data)
         
        for item in serializer.validated_data:
            # print(item)
            # item = dict(item)      
            # item['user_id'] = self.request.user                  
            item['user_id'] = self.request.user            
            print(item)
            for cart in carts:
                print(cart.user_id)
                print(cart.product_id)
                print(cart.price_id)
                print(item['user_id'])
                print(item['product'])
                print(item['price'])
                if item['user_id'].id == cart.user_id and item['product'].id == cart.product_id and item['price'].id == cart.price_id:
                    cart.quantity = item['quantity']
                    cart.save()
                    continue
        Cart.objects.create(product=item['product'],user_id = item['user_id'].id, price_id=item['price'].id, quantity=item['quantity'])
        
        # for cart in carts:
            
            
        #     for item in serializer.validated_data:
        #         item = dict(item)
        #         item['user_id'] = self.request.user
        #         print(item)
        #         if item['user_id'] == cart.user_id and item['product'] == cart.product_id and item['price'] == cart.price_id:
                    
        #             continue
        #         del[cart]
        # Cart.objects.create((product=item['product_id'], product_id=item['product_id'], quantity=item['qunatity']))
        # data = serializer.data[:]
        return Response(item)

    def sync(self, serializer): 
        print('sync')
        for item in serializer.validated_data:
            item['user'] = self.request.user
        return super(CartMutipleCreateView, self).perform_create(serializer)


class CartQuantityAddView(RetrieveUpdateDestroyAPIView):

    serializer_class = CartQuantityUpdateSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        queryset = Cart.objects.filter(user=self.request.user)
        return queryset
    
    def perform_update(self, serializer):
        serializer.validated_data['user'] = self.request.user
        serializer.validated_data['quantity'] =  self.get_object().quantity + 1
        return super(CartQuantityAddView, self).perform_update(serializer)


class CartQuantitySubtractView(RetrieveUpdateDestroyAPIView):

    serializer_class = CartQuantityUpdateSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        queryset = Cart.objects.filter(user=self.request.user)
        return queryset

    
    def update(self, request, *args, **kwargs):
        instance = self.get_object().quantity - 1
        if instance <= 0: 
            return self.delete(request)
      
        return super(CartQuantitySubtractView, self).update(request, *args, **kwargs)
    
    def perform_update(self, serializer):
        serializer.validated_data['user'] = self.request.user
        serializer.validated_data['quantity'] =  self.get_object().quantity - 1
        return super(CartQuantitySubtractView, self).perform_update(serializer)


