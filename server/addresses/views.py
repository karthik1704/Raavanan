from rest_framework import viewsets
from rest_framework.permissions import BasePermission, IsAuthenticated


from .models import Address
from .serializer import AddressSerializer
# Create your views here.

class IsOwner(BasePermission):

    def has_object_permission(self, request, view, obj) -> bool:
        return bool(obj.user == request.user)


class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.none()
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        queryset = Address.objects.filter(user = self.request.user)
        return queryset

    def perform_create(self, serializer):
        serializer.validated_data['user'] = self.request.user
        return super(AddressViewSet, self).perform_create(serializer)