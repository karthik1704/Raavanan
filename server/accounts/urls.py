from django.urls import path

from .views import GoogleLogin

app_name = 'accounts'
urlpatterns = [
    path('google/', GoogleLogin.as_view(), name='google_login'),
]