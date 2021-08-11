from .base import *


# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['192.168.1.11','127.0.0.1']

CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://192.168.1.12:3000',
]

INSTALLED_APPS += []


# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

DATABASES = {
    # 'default': {
    #     'ENGINE': 'django.db.backends.sqlite3',
    #     'NAME': BASE_DIR / 'db.sqlite3',
    # },
    # 'default': {
    #     'ENGINE': 'django.db.backends.postgresql_psycopg2',
    #     'NAME': 'raavanan',
    #     'USER': 'postgres',
    #     'PASSWORD': 'karthik1704',
    #     'HOST': 'localhost',
    #     'PORT': '5432',
    # }
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'raavananstore',
        'USER': 'postgres',
        'PASSWORD': 'postgres',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

PAYTM_CALL_BACK = "http://127.0.0.1:8000/api/order_confirm/"
CLIENT_CALL_BACK = "http://localhost:3000/orderconfirmation"
PAYTM_INITIATE_TRANSACTION = "https://securegw-stage.paytm.in/theia/api/v1/initiateTransaction?mid=BapaHR15076620391870&orderId="
PAYTM_STATUS_TRANSACTION =  "https://securegw-stage.paytm.in/v3/order/status"
M_ID = 'BapaHR15076620391870'
M_KEY = '3LK9Ws71IuWJ2C3C'
PAYTM_WEBSITE = 'WEBSTAGING'
TWILIO_ACCOUNT_SID = 'AC390b9fc4f6f5f7fd2ce146259b5f6ce9'
TWILIO_AUTH_TOKEN = '0e4b1e56dca116cbf9e5c743a7249eb6'  
TWILIO_NUMBER = '+14155238886'

RAZORPAY_ID = 'rzp_test_6AgTLWADecFtHj'

RAZORPAY_SECRET = 'ZBn5Bn6pNmbiUquPNPyk8ZzD'



# Mail
if DEBUG:
    EMAIL_BACKEND='django.core.mail.backends.console.EmailBackend'
# else:
#     EMAIL_BACKEND='django.core.mail.backends.smtp.EmailBackend'

#     EMAIL_HOST = 'smtp.hostinger.in'
#     EMAIL_PORT = 587
#     EMAIL_HOST_USER = 'no-reply@raavananstore.com'
#     EMAIL_HOST_PASSWORD = 'Raavanan@2020'
#     DEFAULT_FROM_EMAIL = 'no-reply@raavananstore.com'
#     EMAIL_USE_TLS = False