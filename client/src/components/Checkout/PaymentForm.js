import React from 'react';
import { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import RAZORPAY_KEY from './merchant-config';
import customAxios from '../../navigation/NavigationService';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import { API_URL, ENV} from '../../CONSTANTS';
import logo from "../../asserts/raavanan logo.png";


import { CheckoutProvider, Checkout, injectCheckout} from 'paytm-blink-checkout-react';

function Test(props) {
  const checkoutJsInstance = props.checkoutJsInstance;
  return <div>{checkoutJsInstance && <span>checkoutJsInstance.TOKEN</span>}</div>;
}
export default function PaymentForm(props) {
  const dispatch = useDispatch();
  const order_create_url = `${API_URL}api/orders/`;
  const order_cofirm_url = `${API_URL}api/order_confirm/`;
  const [config,setConfig] = useState({});
  // const [result,setResult] = useState({});
  const [error,setError] = useState("")
  let history = useHistory()
  function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}
          useEffect(() => {

            const res = loadScript(
              "https://checkout.razorpay.com/v1/checkout.js"
          );
  
          if (!res) {
              setError("Razorpay SDK failed to load. Are you online?");
              return;
          }
            customAxios.post(order_create_url, props.order)
          .then((response) => { 
            // console.log(response);  
            // setResult(response);
            displayRazorpay(response);                     
            // CONFIG.data.amount = response.data.price;
            // CONFIG.data.token = response.data.body.txnToken;
            // CONFIG.data.orderId = response.data.order_id;
            
            // setConfig(CONFIG);       
            // return <PaymentForm paytmdata={response}/>;
          }, (error) => {
            console.log(error);

            setError("Unable to process payment, Please try again later");
            // setOpen(true);
            return;
          })
        }, [dispatch]);

      
        async function displayRazorpay(result) {
          
  
          // const result = await customAxiospost("http://localhost:5000/payment/orders");
  
          if (!result) {
              setError("Server error. Are you online?");
              return;
          }
          
          
          const { amount, id: order_id, currency } = result.data;
  
          const options = {
              key:RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
              amount: amount.toString(),
              currency: currency,
              name: "இராவணன் அங்காடி",              
              image: { logo },
              order_id: order_id,
              handler: async function (response) {
                  const data = {
                      orderCreationId: order_id,
                      razorpayPaymentId: response.razorpay_payment_id,
                      razorpayOrderId: response.razorpay_order_id,
                      razorpaySignature: response.razorpay_signature,
                  };
  
                  const result = await customAxios.post(order_cofirm_url, data);
  
                  // alert(result.data.status);
                  
                  history.push('orderconfirmation/'+result.data.status)
              },
              prefill: {
                "email": "care@raavananstore.com",
                "contact": "7871003935"
           },
              // prefill: {
              //     name: "Soumya Dey",
              //     email: "SoumyaDey@example.com",
              //     contact: "9999999999",
              // },
              // notes: {
              //     address: "Soumya Dey Corporate Office",
              // },
              theme: {
                  color: "#8bc34a",
              },
          };
  
          const paymentObject = new window.Razorpay(options);
          paymentObject.open();
      }
  
  
  // var config = {'head': {'responseTimestamp': '1617899713834', 'version': 'v1', 
  // 'signature': 'WVIfgUvvE6PGeZNQXXuJm0VvrwQRm/bcwGSkqovt0oUEu4jBD1d02mqGSORH4hk1Yvr7bhLI3nPqq5Ua/Wau3/bIv4ONfv6HxZX0oYHlpuE='},
  //  'body': {'resultInfo': {'resultStatus': 'S', 'resultCode': '0000', 'resultMsg': 'Success'}, 
  //  'txnToken': '955cd766f0d04d8f98ec9b4509eec51d1617899713464',
  //  'isPromoCodeValid': false, 'authenticated': false}}
  const InjectedComponent = injectCheckout(Test);
  if(Object.keys(config).length != 0){    
  return <CircularProgress/>
  }
  else{
    
    return <CircularProgress/>

  }
}
