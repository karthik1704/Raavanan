from rest_framework import serializers,exceptions
from rest_framework.exceptions import ValidationError

from accounts.utils import send_otp

from django.utils import timezone
from django.contrib.auth import authenticate
from django.contrib.auth.forms import PasswordResetForm, SetPasswordForm
from django.utils.translation import ugettext_lazy as _
from django.conf import settings
from django.utils.http import urlsafe_base64_encode
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes 

from .models import OneTimePassword, User 

class CustomRegisterSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(style={'input_type':'password'}, write_only=True)
    password2 = serializers.CharField(style={'input_type':'password'}, write_only=True)

    class Meta:
        model = User
        fields = [
            #'username',
            'email', 
            'phone', 
            'first_name',
            'last_name', 
            'password1', 
            'password2',
            'birth_year',
            'country',
        ]
        
        extra_kwargs = {
            'password1': {
                'write_only': True
            }
        }

    def save(self, request):
        import phonenumbers
        # country = self.validated_data['country']
        phone = self.validated_data['phone']
        # phone_number = phonenumbers.parse(phone, country)
        # phone = phonenumbers.format_number(
        #     phone_number, phonenumbers.PhoneNumberFormat.E164
        # )

        user = User(
            # username = self.validated_data['username'] or None,
            email = self.validated_data['email'] or None,
            phone = phone or None,
            first_name = self.validated_data['first_name'],
            last_name = self.validated_data['last_name'],
            # birth_year = self.validated_data['birth_year'],
            # country = self.validated_data['country'],
        )

        password1 = self.validated_data['password1']
        password2 = self.validated_data['password2']

        if password1 != password2:
            raise serializers.ValidationError({'password': 'Password Must Match.'})

        user.set_password(password1)
        user.save()
        return user

    
class CustomLoginSerializer(serializers.Serializer):
   # username = serializers.CharField(required=False, allow_blank=True)
    email = serializers.EmailField(required=False, allow_blank=True)
    phone = serializers.CharField(required=False, allow_blank=True)
    password = serializers.CharField(style={'input_type':'password'})

    class Meta:
        model = User
        fields = ['email', 'phone', 'password']
        extra_kwargs = {
        'password':
            {'write_only':True}
        }
    
    def authenticate(self, **kwargs):
        return authenticate(self.context['request'], **kwargs)

    def _validate_email(self, email, password):
        user = None

        if email and password:
            user = self.authenticate(email=email, password=password)
        else:
            msg = _('Must include "email" and "password".')
            raise exceptions.ValidationError(msg)

        return user

    def _validate_phone(self, phone, password):
        user = None

        if phone and password:
            user = self.authenticate(phone=phone, password=password)
        else:
            msg = _('Must include \"phone\" and \"password\".')
            raise exceptions.ValidationError(msg)

        return user

    # def _validate_username(self, username, password):
    #     user = None

    #     if username and password:
    #         user = self.authenticate(username=username, password=password)
    #     else:
    #         msg = _('Must include \"username\" and \"password\".')
    #         raise exceptions.ValidationError(msg)

    #     return user

    def validate(self, attrs):
        # username = attrs.get('username')
        email = attrs.get('email')
        phone = attrs.get('phone')
        password = attrs.get('password')
        
        if email:
            user = self._validate_email(email, password)
        elif phone:
            user = self._validate_phone(phone, password)
        # elif username:
        #     user = self._validate_username(username, password)
        else:
            msg = _('Must include \"email\" or \"phone\" and \"password\".')
            raise exceptions.ValidationError(msg)
        
        if user:
            if not user.is_active:
                msg = _('User account is disabled.')
                raise exceptions.ValidationError(msg)
        else:
            msg = _('Unable to log in with provided credentials.')
            raise exceptions.ValidationError(msg)

        attrs['user'] = user
        return attrs

    # def get_auth_token(self, obj):
    #     token = Token.objects.create(user=obj)
    #     return token.key

class CustomUserDetailsSerializer(serializers.ModelSerializer):
    """
    User model w/o password
    """
    class Meta:
        model = User
        fields = (
        'pk', 
        # 'username', 
        'email', 
        'phone', 
        'first_name', 
        'last_name',
        'birth_year',
        'country'
        )
        read_only_fields = ('email', 'phone')

class CustomPasswordResetSerializer(serializers.Serializer):

    email = serializers.EmailField(required=False, allow_blank=True)
    phone = serializers.CharField(required=False, allow_blank=True)

    password_reset_form_class = PasswordResetForm

    def get_email_options(self):
        """Override this method to change default e-mail options"""
        return {}

    if email:
        def validate_email(self, value):
            
            self.reset_form = self.password_reset_form_class(data = self.initial_data)

            if not self.reset_form.is_valid():
                raise serializers.ValidationError(self.reset_form.errors)

            return value
    
    if phone:
        def validate_phone(self, value):
            import http.client
            from random import randrange
            conn = http.client.HTTPSConnection("api.msg91.com")
            headers = { 'content-type': "application/json" }
            otp = randrange(4)
            conn.request('GET', f'api/v5/otp?authkey={settings.OTP_AUTH_KEY}&mobile=919597828086&invisible=1&otp={otp}', headers=headers)
            res = conn.getresponse()
            data = res.read()

            print(data.decode("utf-8"))

    def save(self):

        request = self.context.get('request')

        opts = {
            'use_https': request.is_secure(),
            'from_email': getattr(settings, 'DEFAULT_FROM_EMAIL'),
            'request': request,
        }

        opts.update(self.get_email_options())
        self.reset_form.save(**opts)


class PhonePassowordResetSerializer(serializers.Serializer):
    phone = serializers.CharField(required=False, allow_blank=True)

    password_reset_form_class = PasswordResetForm

    def save(self):
        request = self.context.get('request')

        from .utils import get_random_otp, send_otp
        mobile = self.validated_data['phone']
        try:
            user = User.objects.get(phone=mobile)
        except User.DoesNotExist:
            err_msg = _("User Not Found")
            raise serializers.ValidationError(err_msg)
        # print(user.phone)
        otp = get_random_otp()

        try:
            check_already_in_db =   OneTimePassword.objects.filter(phone=mobile)
            check_already_in_db.delete()
            otpModel = OneTimePassword(
                user = user,
                phone = mobile,
                otp = otp
            )
            otpModel.save()
        except OneTimePassword.DoesNotExist:
            otpModel = OneTimePassword(
                user = user,
                phone = mobile ,
                otp = otp
            )
            otpModel.save()
        
        res = send_otp(mobile,otp)
        data = res.read()
        print(data.decode('utf-8'))


class OTPVerifySerializer(serializers.Serializer):
    otp = serializers.CharField()
    mobile = serializers.CharField()  

    def validate(self,value):
        otp = value.get('otp')
        phone = value.get('mobile')

        try:
            otp_verify = OneTimePassword.objects.get(phone = phone)
            if timezone.now() <= otp_verify.created + timezone.timedelta(minutes=10):
                if otp == otp_verify.otp:
                
                    return value
                else:
                    err_msg = _("Wrong OTP")
                    raise serializers.ValidationError(err_msg)
            
        except OneTimePassword.DoesNotExist:
            err_msg = _("User Not Found")
            raise serializers.ValidationError(err_msg)
        
    

    def save(self):
        phone = self.validated_data['mobile']

        user  = User.objects.get(phone=phone)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)

        try:
            otp_model = OneTimePassword.objects.get(phone = phone)
            otp_model.delete()
        except OneTimePassword.DoesNotExist:
            err_msg = _("OTP Expired / Not Found")
            raise serializers.ValidationError(err_msg) 

        return {
            'uid': uid,
            'token': token
        }       



class OTPResendSerializer(serializers.Serializer):
    mobile = serializers.CharField()

    def save(self):
        from .utils import  resend_otp
        mobile = self.validated_data['mobile']
        resend_otp(mobile)

class PhoneRegisterVerifySerializer(serializers.Serializer):
    mobile = serializers.CharField()

    def save(self):
        from .utils import  send_otp, get_random_otp
        mobile = self.validated_data['mobile']
        try:
            user = User.objects.get(phone=mobile)
        except User.DoesNotExist:
            user = None

        otp = get_random_otp()
        
        try:
            already_in_db =   OneTimePassword.objects.filter(phone=mobile)
            already_in_db.delete()
            otpModel = OneTimePassword(
                user = user,
                phone = mobile,
                otp = otp
            )
            otpModel.save()           
        except OneTimePassword.DoesNotExist:
            otpModel = OneTimePassword(
                user = user,
                phone = mobile,
                otp = otp
            )
            otpModel.save()
        
        res = send_otp(mobile,otp)
        data = res.read()
        print(data.decode('utf-8'))

class PhoneRegisterConfirmSerializer(serializers.Serializer):

    otp = serializers.CharField()
    mobile = serializers.CharField()  

    def validate(self,value):
        otp = value.get('otp')
        phone = value.get('mobile')

        try:
            otp_verify = OneTimePassword.objects.get(phone = phone)
            if timezone.now() <= otp_verify.created + timezone.timedelta(minutes=10):
                if otp == otp_verify.otp:
                
                    return value
                else:
                    err_msg = _("Wrong OTP")
                    raise serializers.ValidationError(err_msg) 
            else:
                err_msg = _('OTP Expired')
                raise serializers.ValidationError(err_msg)
        except OneTimePassword.DoesNotExist:
            err_msg = _('OTP Not Found')
            raise serializers.ValidationError(err_msg)
        
    

    def save(self):
        phone = self.validated_data['mobile']
        try:
            otp_model = OneTimePassword.objects.get(phone = phone)
            otp_model.delete()
        except OneTimePassword.DoesNotExist:
            err_msg = _("OTP Expired / Not Found")
            raise serializers.ValidationError(err_msg) 

           
