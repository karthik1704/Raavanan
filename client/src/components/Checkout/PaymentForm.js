import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';

import { useSelector } from 'react-redux';

import RAZORPAY_KEY from './merchant-config';
import logo from '../../asserts/raavanan logo.png';

import {
  CheckoutProvider,
  Checkout,
  injectCheckout,
} from 'paytm-blink-checkout-react';

import {
  useConfrimOrderMutation,
  usePlaceOrderMutation,
} from '../../features/orders/orderApi';

function Test(props) {
  const checkoutJsInstance = props.checkoutJsInstance;
  return (
    <div>{checkoutJsInstance && <span>checkoutJsInstance.TOKEN</span>}</div>
  );
}
export default function PaymentForm(props) {
  const [placeOrder, { isLoading: orderLoading }] = usePlaceOrderMutation();
  const [
    confrimOrder,
    { isLoading: confrimOrderLoading, data: confrimOrderData },
  ] = useConfrimOrderMutation();

  const [config, setConfig] = useState({});
  // const [result,setResult] = useState({});
  const [error, setError] = useState('');
  let navigate = useNavigate();

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement('script');
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
    const res = loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      setError('Razorpay SDK failed to load. Are you online?');
      return;
    }

    placeOrder(props.order)
      .unwrap()
      .then((payload) => {
        // console.log(response);
        // setResult(response);
        displayRazorpay(payload);
        // CONFIG.data.amount = response.data.price;
        // CONFIG.data.token = response.data.body.txnToken;
        // CONFIG.data.orderId = response.data.order_id;

        // setConfig(CONFIG);
        // return <PaymentForm paytmdata={response}/>;
      })
      .catch((error) => {
        console.log(error);

        setError('Unable to process payment, Please try again later');
        // setOpen(true);
        return;
      });
  }, []);

  async function displayRazorpay(result) {
    // const result = await axios.post("http://localhost:5000/payment/orders");

    if (!result) {
      setError('Server error. Are you online?');
      return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: 'இராவணன் அங்காடி',
      image: { logo },
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        await confrimOrder(data);

        // alert(result.data.status);

        navigate(`orderconfirmation/ + ${confrimOrderData.status}`, {
          replace: true,
        });
      },
      prefill: {
        email: 'care@raavananstore.com',
        contact: '7871003935',
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
        color: '#8bc34a',
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

  if (Object.keys(config).length !== 0) {
    return <CircularProgress />;
  } else {
    return <CircularProgress />;
  }
}
