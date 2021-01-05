from django.shortcuts import render

from django.utils.translation import ugettext_lazy as _

from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny

from .serializer import OTPResendSerializer, OTPVerifySerializer, PhonePassowordResetSerializer

from .models import User, PhoneConfirmation

# Create your views here.

class PhonePasswordResetView(GenericAPIView):

    serializer_class = PhonePassowordResetSerializer
    permission_classes = (AllowAny,)
    throttle_scope = 'dj_rest_auth'

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception = True)

        # user = User.objects.filter(phone=serializer.phone)
        # print(user)

        serializer.save()

        return Response(
            {'detail': _('OTP Sended To Mobile')},
            status= status.HTTP_200_OK
        )

class PhonePasswordResetVerifyView(GenericAPIView):
    serializer_class = OTPVerifySerializer
    permission_classes = (AllowAny,)
    throttle_scope = 'dj_rest_auth'
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception=True)
     
        data = serializer.save()
    
        return Response({
            'uid': data['uid'],
            'token': data['token']
        },)
        
class OTPResendView(GenericAPIView):

    serializer_class = OTPResendSerializer
    permission_classes = (AllowAny,)
    throttle_scope = 'dj_rest_auth'

    def post(self, request, *args, **kwargs):

        serializer = self.get_serializer(data = request.data)
        serializer.is_valid()
     
        serializer.save()

        return Response({
            'detail': 're-send otp successfully'
        },)


from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter