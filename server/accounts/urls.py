from  django.urls import path, include

from .views import (
    GoogleLogin,
    OTPResendView, 
    PhoneNumberConfirmView,
    PhonePasswordResetView,
    PhonePasswordResetVerifyView,
    PhoneNumberVerifyView,
)
urlpatterns = [
    path('password/reset/phone/', PhonePasswordResetView.as_view(), name="password_reset_phone"),
    path('password/reset/phone/verify/', PhonePasswordResetVerifyView.as_view(), name="password_reset_phone_verify"),
    path('phone/resend/', OTPResendView.as_view(), name="resend_otp"),
    path('phone/verify/otp/', PhoneNumberVerifyView.as_view(), name="send_otp"),
    path('phone/verify/otp/confirm/', PhoneNumberConfirmView.as_view(), name="send_otp"),
    path('google/', GoogleLogin.as_view(), name="google_login"),
    path('accounts/', include('allauth.urls'), name='socialaccount_signup'),
]