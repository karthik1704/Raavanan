import http.client
import random
from urllib.parse import urlencode, quote_plus
from django.conf import settings

conn = http.client.HTTPConnection("api.msg91.com")
headers = { 'content-type': "application/json" }


def send_otp(mobile,otp=None):

    if otp is None:
        otp = get_random_otp()
    
    data = {'authkey': settings.OTP_AUTH_KEY, 'mobile':mobile, 'otp': otp }
    encode = urlencode(data, quote_via=quote_plus)
    conn.request('GET', f'/api/v5/otp?{encode}', headers=headers)
    res = conn.getresponse()
    conn.close()
    return res


def resend_otp(mobile):
    data = {'authkey': settings.OTP_AUTH_KEY, 'mobile':mobile , 'retrytype': 'text'}
    encode = urlencode(data, quote_via=quote_plus)
    conn.request('POST', f'/api/v5/otp/retry?{encode}', headers=headers)
    res = conn.getresponse()
    data = res.read()
    print(data.decode('utf-8'))
    conn.close()
    return res

def get_random_otp():
    return random.randint(100000,999999)


