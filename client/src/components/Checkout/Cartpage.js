import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
//import makeStyles from '@mui/styles/makeStyles';
import { useState, useEffect, useLayoutEffect } from 'react';
import { createSelector } from 'reselect';
import customAxios from '../../navigation/NavigationService';
import { API_URL } from '../../CONSTANTS';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate  } from 'react-router-dom';
import Icon from '@mui/material/Icon';
import Header from '../../components/Header/Header';
import CartItem from '../../components/Checkout/cart-item';

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: '#43a047',
//   },
//   form: {
//     width: '100%', // Fix IE 11 issue.
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
//   padding_bottom: {
//     paddingBottom: 10,
//   },

// }));

export const selectCartItems = createSelector(
  (state) => state.cart,
  (cart) => cart.cartItems
);

export default function Cartpage() {
  //const classes = useStyles();

  const login = useSelector((state) => state.login);
  const loggedIn = login.loggedIn;
  const cart = useSelector((state) => state.cart);
  const cartItems = cart.cartItems;
  const [prodList, setProdList] = useState([]);
  const [total, setTotal] = useState(0);
  const [weight, setWeight] = useState(0);
  const [courier, setCourier] = useState(0);
  let history = useNavigate ();
  const dispatch = useDispatch();

  useEffect(() => {
    var cart_ids = [];
    const prods = [];
    var totals = 0;
    var weights = 0;

    cartItems.map((product) => cart_ids.push(product.id));
    // var myArray = ['a', 1, 'a', 2, '1'];
    var cart_ids = cart_ids.filter((v, i, a) => a.indexOf(v) === i);
    cart_ids = cart_ids.join(',');

    if (cart_ids.length < 1) return;
    customAxios.get(`${API_URL}api/custom/products/?ids=${cart_ids}`).then((res) => {
      var prod = res.data;
      // prod.filter()

      cartItems.map((prod) => {
        var product = res.data.results.find(
          (product) => product.id === prod.id
        );

        var price = product.price.find((price) => price.id === prod.price_id);

        totals = totals + prod.quantity * price.price;
        weights = weights + prod.quantity * price.weight;
        product = {
          ...product,
          quantity: prod.quantity,
          price: price,
          total: prod.quantity * price.price,
          otherinfo: prod.otherinfo,
        };
        prods.push(product);
      });

      setProdList(prods);
      setTotal(totals);
      setWeight(weights);
    });
  }, [cartItems, dispatch]);

  useEffect(() => {
    
    customAxios.post(`${API_URL}api/calculate_delivery/`, {'weight':weight}).then((res) => {
      
      setCourier(res.data.charge)
  });
}, [weight]);

  const checkout = () => {
    history.push('/checkout');
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12}>
          <div>
            <div>
              <h3 className="Order_title">PRODUCTS</h3>
            </div>
            {prodList.length > 0 ? (
              prodList.map((product, index) => <CartItem product={product} key={index} />)
              
            ) : (
              <h4 className="Product_Text"> Your cart is empty</h4>
            )}
            
            <Grid item xs={12} sm={12} md={12} justify="space-between" container >
            <Grid item xs={12} sm={12} md={8}>
              </Grid>

            <Grid item xs={12} sm={12} md={4} >
          <div className='price_card'>
            <div>
              {/* className={classes.Order_summary} */}
              <h3 className="Order_title">ORDER SUMMARY</h3>
            </div>
            <div className="Total_Text">
              <h3>Price:</h3>
              <h3>₹ {total}.00</h3>
            </div>
            <div className="Total_Text">
              <h3>Courier Charges:</h3>
              <h3>₹ {courier}.00</h3>
            </div>
            <div>
              <hr></hr>
              {/* <p>Shipping, taxes, and discounts are included in the total.</p> */}
              <div className="Total_Text">
              <h3>Total:</h3>
              <h3>₹ {total+courier}.00</h3>
            </div>
              
            </div>
          </div>
        </Grid>

        </Grid>
            



          </div>
        </Grid>
      </Grid>
    </>
  );
}
