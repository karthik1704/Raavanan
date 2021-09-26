from .base import *

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ['192.168.1.11','127.0.0.1']

CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://192.168.1.12:3000',
]

# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': env('DATABASE_NAME'),
        'USER': env('DATABASE_USER'),
        'PASSWORD': env('DATABASE_PASSWORD'),
        'HOST': env('DATABASE_HOST'),
        'PORT': env('DATABASE_PORT'),
    }
}

#paytm
PAYTM_CALL_BACK = "https://api.raavananstore.com/api/order_confirm/"
CLIENT_CALL_BACK = "https://raavananstore.com/orderconfirmation"
PAYTM_INITIATE_TRANSACTION = "https://securegw-stage.paytm.in/theia/api/v1/initiateTransaction?mid=BapaHR15076620391870&orderId="
PAYTM_STATUS_TRANSACTION =  "https://securegw-stage.paytm.in/v3/order/status"
M_KEY = 'BapaHR15076620391870'
M_ID = '3LK9Ws71IuWJ2C3C'
TWILIO_ACCOUNT_SID = 'AC390b9fc4f6f5f7fd2ce146259b5f6ce9'
TWILIO_AUTH_TOKEN = '0e4b1e56dca116cbf9e5c743a7249eb6'  
TWILIO_NUMBER = '+14155238886'


# Mail

EMAIL_BACKEND='django.core.mail.backends.smtp.EmailBackend'

# E-mail Sever Config
EMAIL_HOST = env('EMAIL_HOST')
EMAIL_PORT = env('EMAIL_PORT')
EMAIL_HOST_USER = env('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = env('EMAIL_HOST_PASSWORD')
DEFAULT_FROM_EMAIL = env('DEFAULT_FROM_EMAIL')
EMAIL_USE_TLS = False