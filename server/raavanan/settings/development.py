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
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'raavanan',
        'USER': 'postgres',
        'PASSWORD': 'karthik1704',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}



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