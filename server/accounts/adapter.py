from allauth.account.adapter import DefaultAccountAdapter
from allauth.account import app_settings

from django.urls import reverse
from django.contrib.sites.shortcuts import get_current_site
from urllib.parse import urlsplit

class CustomAccountAdapter(DefaultAccountAdapter):

    # def get_email_confirmation_url(self, request, emailconfirmation):
    #     site = get_current_site(request)
    #     location = reverse("account_confirm_email", args=[emailconfirmation.key])

    #     bits = urlsplit(location)
    #     if not (bits.scheme and bits.netloc):
    #         uri = '{proto}://{domain}{url}'.format(
    #             proto=app_settings.DEFAULT_HTTP_PROTOCOL,
    #             domain=site.domain,
    #             url=location)
    #     else:
    #         uri = location

    #     return uri

    def get_email_confirmation_url(self, request, emailconfirmation):
        return f'https://raavananstore.com/verify/{emailconfirmation.key}'