from django.shortcuts import render
from  rest_framework import viewsets,generics
from rest_framework.permissions import IsAuthenticated, BasePermission, AllowAny
from rest_framework.views import APIView
from .models import Order
from .serializers import OrderSerializer
from rest_framework.response import Response
from django.http import HttpResponseRedirect
from rest_framework import status
from cart.models import Cart
from products.models import Product
from products.serializers import ProductSerializer
from products.models import Price
from addresses.models import Address
# from accounts.utils import send_message
import paytmchecksum
import json
import requests
from django.conf import settings
from django.core import serializers
from twilio.rest import Client 
# Create your views here.
def paytm(order_id, customer_id, price):    

    # import checksum generation utility
    # You can get this utility from https://developer.paytm.com/docs/checksum/
    paytmParams = dict()

    paytmParams["body"] = {
        "requestType": "Payment",
        "mid": settings.M_KEY,
        "websiteName": "WEBSTAGING",
        "orderId": order_id,
        "callbackUrl": settings.PAYTM_CALL_BACK,
        "txnAmount": {
            "value": price,
            "currency": "INR",
        },
        "userInfo": {
            "custId": customer_id,
        },
    }

    # Generate checksum by parameters we have in body
    # Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
    checksum = paytmchecksum.generateSignature(
        json.dumps(paytmParams["body"]), settings.M_ID)
    
    paytmParams["head"] = {
        "signature": checksum
    }

    post_data = json.dumps(paytmParams)

    # for Staging
    # url = "https://securegw-stage.paytm.in/theia/api/v1/initiateTransaction?mid=BapaHR15076620391870&orderId="+str(order_id)
    url = settings.PAYTM_INITIATE_TRANSACTION+str(order_id)

    # for Production
    # url = "https://securegw.paytm.in/theia/api/v1/initiateTransaction?mid=YOUR_MID_HERE&orderId="+str(order_id)
    response = requests.post(url, data=post_data, headers={
                            "Content-type": "application/json"}).json()
    print(response)
    return response

def paytm_transaction_status(order_id, customer_id, total_price):

    # import checksum generation utility
    # You can get this utility from https://developer.paytm.com/docs/checksum/
    # import PaytmChecksum

    # initialize a dictionary
    paytmParams = dict()

    # body parameters
    paytmParams["body"] = {

    # Find your MID in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
    "mid" : settings.M_KEY,

    # Enter your order id which needs to be check status for
    "orderId" : order_id,
        }

    # Generate checksum by parameters we have in body
    # Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
    checksum = paytmchecksum.generateSignature(json.dumps(paytmParams["body"]), settings.M_ID)    
    # head parameters
    paytmParams["head"] = {

        # put generated checksum value here
        "signature"	: checksum
    }

    # prepare JSON string for request
    post_data = json.dumps(paytmParams)

    # for Staging
    # url = "https://securegw-stage.paytm.in/v3/order/status"
    url = settings.PAYTM_STATUS_TRANSACTION
    # for Production
    # url = "https://securegw.paytm.in/v3/order/status"    
    response = requests.post(url, data = post_data, headers = {"Content-type": "application/json"}).json()
    return response

         
class OrderConfirmView(APIView):
    """
    List all orders, or create a new snippet.
    """
    permission_classes = [AllowAny]
    def get(self, request, format=None):
        snippets = Order.objects.filter(user=self.request.user).latest('created_at')
        serializer = OrderSerializer(snippets, many=False)        
        paytm_status = paytm_transaction_status(serializer.data['id'], serializer.data['user_id'], serializer.data['total_price'])        
        status = paytm_status['body']['resultInfo']['resultStatus']        
        snippets.transaction_status = status
        if status == 'TXN_SUCCESS':
            snippets.order_status = 'Placed'
        snippets.save()
        serializer.data['transaction_status'] = status        
        order_no = '#RAAV'+str(serializer.data['id'])
        message = 'Hi, Your order number '+order_no+' has been successfully placed'
        # try:
        # details = "மொத்த விலை : "+str(serializer.data['total_price'])
        # client = Client(settings.ACCOUNT_SID, settings.AUTH_TOKEN) 
        # template = """அன்பார்ந்த வணக்கங்கள் ! ராவணன் அங்காடியில் பொருள் வாங்கியமைக்கு மிக்க நன்றி  குறியீட்டு எண் : """+order_no+" விபரம்: "+details
        
        
        # message = client.messages.create( 
        #                             from_='whatsapp:'+settings.TWILIO_NUMBER,  
        #                             body= template,
        #                             to='whatsapp:+919750709506' )
        # except  Exception:
        #     print(Exception)
        # send_message(self.request.user.phone,  message)
        Cart.objects.filter(user_id=serializer.data['user_id']).delete()
        return Response(serializer.data)

    def post(self, request, format=None):        
        if not request.data.get('ORDERID', False):
            return Response("Invalid Order ID", status=status.HTTP_400_BAD_REQUEST)
        snippets = Order.objects.filter(id=request.data.get('ORDERID')).latest('created_at')
        snippets.transaction_status = request.data.get('STATUS')
        snippets.payment_id = request.data.get('TXNID')
        redirect_url = settings.CLIENT_CALL_BACK+'/failure'
        if request.data.get('STATUS') == 'TXN_SUCCESS':
            snippets.order_status = 'Placed'
            redirect_url = settings.CLIENT_CALL_BACK+'/success'
        snippets.save()
        details = "மொத்த விலை : "+ str(snippets.total_price)+"\n"
        if request.data.get('STATUS') == 'TXN_SUCCESS':
            
            serializer = OrderSerializer(snippets, many=False)
            
            i =  1
            for item in serializer.data['items']:
                details += 'பொருள் '+str(i)+ ":"
                prod = Product.objects.filter(id=item['product'])            
                prod = serializers.serialize('json', prod) 
                prod = json.loads(prod)
                item['product'] = prod[0]['fields']
                
                item['product']['quantity'] = item['quantity']
                
                details+= 'பெயர் '+item['product']['name']+'\n'
                details+= 'எண்ணிக்கை  '+str(item['product']['quantity'])+'\n'
                i+=1
            order_no = '#RAAV'+str(snippets.id)
            # message = 'Hi, Your order number '+order_no+' has been successfully placed'
            
            client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN) 
            template = """அன்பார்ந்த வணக்கங்கள் ! ராவணன் அங்காடியில் பொருள் வாங்கியமைக்கு மிக்க நன்றி  குறியீட்டு எண் : """+order_no+" விபரம்: "+details
            
            
            # message = client.messages.create( 
            #                             from_='whatsapp:'+settings.TWILIO_NUMBER,  
            #                             body= template,
            #                             to='whatsapp:+919750709506' )
            # send_message(self.request.user.phone,  message)
            Cart.objects.filter(user_id=snippets.user_id).delete()

        return HttpResponseRedirect(redirect_to=redirect_url)
        


class OrderView(APIView):
    """
    List all orders, or create a new snippet.
    """
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        snippets = Order.objects.filter(user=self.request.user,).exclude(order_status='Processing')
        serializer = OrderSerializer(snippets, many=True)        

        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            
            user = self.request.user           
            serializer.validated_data['user'] = self.request.user
            data = serializer.validated_data            
            price = 0
            for item in data['items']:                
                price += item['price'].price *  item['quantity']        
            data["total_price"] = price            
            order = OrderSerializer.create(self, data)
            # create_id = Order.objects.create(data)
            
            paytm_reponse = paytm(order.id, order.user_id, order.total_price)
           
            paytm_reponse['order_id'] = order.id
            paytm_reponse['price'] =  order.total_price
            return Response(paytm_reponse, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class OrderDetailView(APIView):
    """ 
    List all orders, or create a new snippet.
    """
    permission_classes = [IsAuthenticated]
    def get(self, request,order_no, format=None):        
        num = order_no.split("RAAV")
        if not num or len(num) < 2:
            return Response("Invalid Order ID", status=status.HTTP_400_BAD_REQUEST)
        snippets = Order.objects.filter(user=self.request.user, id=num[1]).exclude(order_status='Processing')
        if not snippets:
            return Response("Invalid Order ID", status=status.HTTP_400_BAD_REQUEST)
        
        serializer = OrderSerializer(snippets, many=True)    
        # return Response(serializer.data)
        # print(serializer)
        # d =serializers.serialize('json',  serializers.serialize('json', serializer.data[0]['items']))  
        # 
        # q = serializers.serialize('json', serializer.data) 
        
        address = Address.objects.filter(id=serializer.data[0]['address'])
        address = serializers.serialize('json', address)
        # print(json.loads(address))
        address = json.loads(address)
        # print(address[0][0])   
        serializer.data[0]['address']= address[0]['fields']
        # print(settings.MEDIA_ROOT)
        # print(serializer.data)
        # return Response(serializer.data)

        for item in serializer.data[0]['items']:
            prod = Product.objects.filter(id=item['product'])            
            prod = serializers.serialize('json', prod) 
            prod = json.loads(prod)
            item['product'] = prod[0]['fields']
            # print(item['product'])
            # for pro in item['product']:
            #     print(self.request._current_scheme_host)
            item['product']['imageurl'] = '%s%s%s' % (self.request._current_scheme_host, settings.MEDIA_URL, item['product']['imageurl'])
            
            price = Price.objects.filter(id=item['price'])
            price = serializers.serialize('json', price)
            price = json.loads(price)
            item['product']['quantity'] = item['quantity']
            item['product']['price'] = price[0]['fields'] 
            item['product']['total'] = item['product']['price']['price'] * item['quantity']
        # send_message(self.request.user.phone,  'Hi')
        return Response(serializer.data)

class UserOrderViewset(generics.ListAPIView):
    queryset = Order.objects.none()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        queryset = Order.objects.filter(user=self.request.user)
        return queryset


class OrderCreateView(generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated, ]

    def perform_create(self, serializer):        
        serializer.validated_data['user'] = self.request.user
        data = super(OrderCreateView, self).perform_create(serializer)        
        return data


