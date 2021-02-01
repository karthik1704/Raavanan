"""
WSGI config for raavanan project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

import environ

env = environ.Env()
# reading .env file
root = environ.Path(__file__) - 2
environ.Env.read_env(root() + '/.env')


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'raavanan.settings.production')

if env('DJANGO_SETTINGS_MODULE'):
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', env('DJANGO_SETTINGS_MODULE'))

application = get_wsgi_application()
