import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect, useLayoutEffect } from 'react';
import { createSelector } from 'reselect';
import axios from 'axios';
import { API_URL } from '../../CONSTANTS';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import Header from '../../components/Header/Header';
import CartItem from '../../components/cart-item/cart-item'
import './Cartpage.css';

// import {selectCartItems} from '../Cartpage/cart.selectors'
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#43a047',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  padding_bottom: {
    paddingBottom: 10,
  },
}));
export const selectCartItems = createSelector(
  state => state.cart,
  cart => cart.cartItems
);



export default function Cartpage() {
  const classes = useStyles();
  // const cart = useSelector((state) => state.cart);
  // const cartItems = selectCartItems();
  const login = useSelector((state) => state.login);
  const loggedIn = login.loggedIn;
  // const cartItems = useSelector(selectCartItems)
  const cart = useSelector((state) => state.cart);
  const cartItems = cart.cartItems;
  const [prodList,setProdList] = useState([]);
  const [total,setTotal] = useState(0);
  let history = useHistory()
  const dispatch = useDispatch();
  // console.log(selectCartItems);
//   const get_prods = (myArray) => {
//     const promises = myArray.map(async (myValue) => {
//         return {
//             id: "my_id",
//             myValue: await service.getByValue(myValue)
//         }
//     });
//     return Promise.all(promises);
// }

  useEffect(() => {
    var cart_ids = [];
    const prods = [];
    var totals = 0;

    cartItems.map((product) =>(
      cart_ids.push(product.id)
    ))
    // var myArray = ['a', 1, 'a', 2, '1'];
    var cart_ids = cart_ids.filter((v, i, a) => a.indexOf(v) === i);
    cart_ids = cart_ids.join(',');
    console.log(cartItems);
    console.log(cart_ids)
    if(cart_ids.length < 1)
      return;
    axios
    .get(`${API_URL}api/custom/products/?ids=${cart_ids}`)
    .then((res) => {
      var prod = res.data
      // prod.filter()


      cartItems.map((prod) =>{

        var product = res.data.results.find(
          product => product.id === prod.id 
        );

        var price = product.price.find(
          price => price.id ===prod.price_id
        );

        totals  = totals + (prod.quantity * price.price)
        product = {...product,quantity:prod.quantity, price : price, total : prod.quantity * price.price }
        prods.push(product);

      })


      // res.data.results.map((product) =>{
       
      //   var prod = cartItems.find(
      //     cartItem => cartItem.id === product.id
      //   );

      //   var price = product.price.find(
      //     price => price.id ===prod.price_id
      //   );
      //   totals  = totals + (prod.quantity * price.price)
      //   product = {...product,quantity:prod.quantity, price : price, total : prod.quantity * price.price }
      //   prods.push(product);
        
      //   })
      
      
      setProdList(prods);
      setTotal(totals);
      
    }
  )
    
}, [cartItems,dispatch]);

const checkout=() => {  
  history.push("/checkout")
  
}

  // useEffect(() => {
    
  //   if(!login.loggedIn)
  //     return;
      
  //   if(cartItems.length > 0){
  //     var carts = []
  //     for(var i=0;i<cartItems.length;i++){
  //       carts.push({
  //         "product" : cartItems[i]['id'],
  //         "price" : cartItems[i]['price_id']['id'],
  //         "quantity": cartItems[i]['quantity']
  //       })
  //     }
  //     axios
  //     .post(`${API_URL}api/sync_cart/`,carts)
  //     .then((res) => {
        
  //     });
  //   }
    
      
        
  // }, [login]);

  

  return (
    <>
      <Header title="Cart" subtitle="Home" />

      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={8}>
          <div>
            <div>
              <h3 className="Order_title">PRODUCTS</h3>
            </div>
            {prodList.length > 0
            ? 
        
            prodList.map((product) => (
              
             // var prod = {...product,''}
              <CartItem product={product} />            
             
              ))
            
            : <h4 class="Product_Text"> Your cart is empty</h4> 
      }
            
            
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <div>
            <div className={classes.Order_summary}>
              <h3 className="Order_title">ORDER SUMMARY</h3>
            </div>
            <div className="Total_Text">
              <h3>Subtotal:</h3>
              <h3>₹ {total}.00</h3>
            </div>
            <div>
              <p>
                Shipping, taxes, and discounts are included in the total.
              </p>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={checkout}
              >
                Check Out
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

