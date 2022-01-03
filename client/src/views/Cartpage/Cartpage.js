import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import customAxios from '../../navigation/NavigationService';
import { createSelector } from 'reselect';
import { API_URL } from '../../CONSTANTS';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Header from '../../components/Header/Header';
import CartItem from '../../components/cart-item/cart-item';
import './Cartpage.css';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const selectCartItems = createSelector(
  (state) => state.cart,
  (cart) => cart.cartItems
);

const Cartpage = () => {
  // const classes = useStyles();
  // const cart = useSelector((state) => state.cart);
  // const cartItems = selectCartItems();
  const login = useSelector((state) => state.login);
  const loggedIn = login.loggedIn;
  const [open, setOpen] = useState(false);
  
  const [error, setError] = useState(false);
  
  // const cartItems = useSelector(selectCartItems)
  const cart = useSelector((state) => state.cart);
  const cartItems = cart.cartItems;
  const [prodList, setProdList] = useState([]);
  const [total, setTotal] = useState(0);
  const [weight, setWeight] = useState(0);
  const [courier, setCourier] = useState(0);
  let history = useHistory();
  
  let error_occured = false;
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }

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

      // eslint-disable-next-line array-callback-return
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
          total: prod.quantity * price.price          
        };
        prods.push(product);
      });

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
      setWeight(weights);
      
    });
  }, [cartItems, dispatch]);


  useEffect(() => {
    
      customAxios.post(`${API_URL}api/calculate_delivery/`, {'weight':weight}).then((res) => {
        
        setCourier(res.data.charge)
    });
  }, [weight]);

  const executeAllLongRunningTasks = async () => {
    error_occured = false
    return await Promise.all(

      prodList.map((product, index) => {
      
      if(product.other_information){
        let existingCartItem = cartItems.find(
          (cartItem) =>
            cartItem.id == product.id &&
            cartItem.price_id == product.price.id
        )
          
        if(!existingCartItem.otherinfo){
          
          error_occured = true
          setError(product.other_information);
          setOpen(true);
          
          
        }
      }
      
    })

    )
}


  const checkout=()=>{
    
    const tasks = executeAllLongRunningTasks();
    if(!error_occured)
      history.push('/checkout')
    
  }
  
  

  return (
    <>
      <Header title="Cart" subtitle="Home" />

      <Grid container style={{ padding: '10px' }}>
        <Grid item xs={12} sm={12} md={8}>
          <div>
            <div>
              <h3 className="Order_title">PRODUCTS</h3>
            </div>
            {prodList.length > 0 ? (
              prodList.map((product, index) => (
                // var prod = {...product,''}
                <CartItem product={product} key={index} />
              ))
            ) : (
              <h4 className="Product_Text"> Your cart is empty</h4>
            )}
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                inputProps={{
                  maxLength: 30,
                  autoComplete: 'false',
                }}
                sx={{
                  margin: (theme) => theme.spacing(3, 0, 2),
                }}
                onClick={checkout}
              >
                Check Out
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
      <Snackbar
        // key={messageInfo ? messageInfo.key : undefined}
        open={open}
        autoHideDuration={6000}        
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={handleClose}
        // TransitionProps={{ onExited: handleClose }}
        // message={error}
        // action={
        //   <React.Fragment>
            
        //     {/* <Button color="secondary" size="small" onClick={handleClose}>
        //       UNDO
        //     </Button> */}
        //     {/* <IconButton
        //       aria-label="close"
        //       color="inherit"
        //       sx={{ p: 0.5 }}
        //       onClick={handleClose}
        //     >
        //       <CloseIcon />
        //     </IconButton> */}
        //   </React.Fragment>
          
        // }
        >
          
          <Alert severity="error" onClose={handleClose}>
          {error}
        </Alert>
        
        </Snackbar>
    </>
  );
}
export default  Cartpage;