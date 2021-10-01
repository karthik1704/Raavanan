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
import axios from 'axios';
import { API_URL } from '../../CONSTANTS';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
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
  let history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    var cart_ids = [];
    const prods = [];
    var totals = 0;

    cartItems.map((product) => cart_ids.push(product.id));
    // var myArray = ['a', 1, 'a', 2, '1'];
    var cart_ids = cart_ids.filter((v, i, a) => a.indexOf(v) === i);
    cart_ids = cart_ids.join(',');

    if (cart_ids.length < 1) return;
    axios.get(`${API_URL}api/custom/products/?ids=${cart_ids}`).then((res) => {
      var prod = res.data;
      // prod.filter()

      cartItems.map((prod) => {
        var product = res.data.results.find(
          (product) => product.id === prod.id
        );

        var price = product.price.find((price) => price.id === prod.price_id);

        totals = totals + prod.quantity * price.price;
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
    });
  }, [cartItems, dispatch]);

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
          </div>
        </Grid>
      </Grid>
    </>
  );
}
