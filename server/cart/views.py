from django.shortcuts import render
from rest_framework import request

from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework import viewsets 
from rest_framework.permissions import IsAuthenticated, BasePermission

from django.http import Http404
from rest_framework.response import Response
from rest_framework.request import clone_request
from rest_framework import status


from .models import Cart
from .serializers import CartSerializer
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
# TODO: Mutiple carts Items add as once view



class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        queryset = Cart.objects.filter(user=self.request.user)
        return queryset
    
    def get_serializer(self, *args, **kwargs):
        return super().get_serializer(many=True ,*args, **kwargs)

    # ! Mutiple carts Items add as once view
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

    but it breaks normal one object create !!
    TODO: Plan to separate Multi Create form normal create giving different API endpints
    """
    def perform_create(self, serializer): 
        for item in serializer.validated_data:
            item['user'] = self.request.user
        return super(CartViewSet, self).perform_create(serializer)

    def perform_update(self, serializer):
        serializer.validated_data['user'] = self.request.user
        serializer.validated_data['quantity'] =  self.get_object().quantity + 1
        return super(CartViewSet, self).perform_update(serializer)


class CartQuantitySubtractView(RetrieveUpdateDestroyAPIView):

    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        queryset = Cart.objects.filter(user=self.request.user)
        return queryset

    
    def update(self, request, *args, **kwargs):
        instance = self.get_object().quantity - 1
        if instance <= 0: 
            return self.delete(request)
      
        return super().update(request, *args, **kwargs)
    
    def perform_update(self, serializer):
        serializer.validated_data['user'] = self.request.user
        serializer.validated_data['quantity'] =  self.get_object().quantity - 1
        return super(CartQuantitySubtractView, self).perform_update(serializer)