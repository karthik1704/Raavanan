import React from 'react';
import { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CONFIG from './merchant-config';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { API_URL, ENV} from '../../CONSTANTS';

import { CheckoutProvider, Checkout, injectCheckout} from 'paytm-blink-checkout-react';

function Test(props) {
  const checkoutJsInstance = props.checkoutJsInstance;
  return <div>{checkoutJsInstance && <span>checkoutJsInstance.TOKEN</span>}</div>;
}
export default function PaymentForm(props) {
  const dispatch = useDispatch();
  const order_create_url = `${API_URL}api/orders/`;
  const [config,setConfig] = useState({});
  const [error,setError] = useState("")
          useEffect(() => {
            
            axios.post(order_create_url, props.order)
          .then((response) => {                        
            CONFIG.data.amount = response.data.price;
            CONFIG.data.token = response.data.body.txnToken;
            CONFIG.data.orderId = response.data.order_id;
            
            setConfig(CONFIG);       
            // return <PaymentForm paytmdata={response}/>;
          }, (error) => {
            console.log(error);

            setError("Unable to process payment, Please try again later");
            // setOpen(true);
            return;
          })
        }, [dispatch]);
  
  // var config = {'head': {'responseTimestamp': '1617899713834', 'version': 'v1', 
  // 'signature': 'WVIfgUvvE6PGeZNQXXuJm0VvrwQRm/bcwGSkqovt0oUEu4jBD1d02mqGSORH4hk1Yvr7bhLI3nPqq5Ua/Wau3/bIv4ONfv6HxZX0oYHlpuE='},
  //  'body': {'resultInfo': {'resultStatus': 'S', 'resultCode': '0000', 'resultMsg': 'Success'}, 
  //  'txnToken': '955cd766f0d04d8f98ec9b4509eec51d1617899713464',
  //  'isPromoCodeValid': false, 'authenticated': false}}
  const InjectedComponent = injectCheckout(Test);
  if(Object.keys(config).length != 0){    
  return (
//     <CheckoutProvider config={CONFIG} env="STAGE">
//   <InjectedComponent />
// </CheckoutProvider>
<>
{/* <div>{error}</div> */}
<CircularProgress/>
<CheckoutProvider config={config}
          // checkoutJsInstance={checkoutJsInstance}
          openInPopup={true} 
          env={ENV}>
          {/* <InjectedCheckout /> */}
          <Checkout />
        </CheckoutProvider>
        </>
  );
  }
  else{
    
    return <CircularProgress/>

  }
}
