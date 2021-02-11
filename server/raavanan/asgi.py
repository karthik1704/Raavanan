"""
ASGI config for raavanan project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application

import environ

env = environ.Env()
# reading .env file
root = environ.Path(__file__) - 2
environ.Env.read_env(root() + '/.env')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'raavanan.settings.production')

if env('DJANGO_SETTINGS_MODULE'):
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', env('DJANGO_SETTINGS_MODULE'))

application = get_asgi_application()
