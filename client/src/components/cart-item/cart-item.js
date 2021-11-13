// import Link from '@mui/material/Link';
import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import { addItem, removeItem, addOtherInfo } from '../../data/actions/cartActions';
import { useDispatch } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce';
// const useStyles = makeStyles((theme) => ({
//   root: {
//     maxWidth: 238,
//     marginBottom: theme.spacing(0.5),
//     [theme.breakpoints.down('md')]: {
//       maxWidth: 140,
//     },
//     [theme.breakpoints.up('sm')]: {
//       minWidth: 180,
//     },
//   },
//   paper: {
//     padding: theme.spacing(2),
//     margin: '20px',
//   },
//   chip: {
//     display: 'flex',
//     justifyContent: 'center',
//     flexWrap: 'wrap',
//     '& > *': {
//       margin: theme.spacing(0.5),
//     },
//   },
//   media: {
//     marginTop: '5px',
//     paddingTop: 10,
//     paddingRight: 10,
//     [theme.breakpoints.down('md')]: {
//       width: 150,
//       height: 150,
//     },
//     width: 200,
//     height: 200,
//   },
//   icon: {
//     cursor: 'pointer',
//   },
// }));

const CartItem = ({ product }) => {
  const [otherinfo, setOtherInfo] = useState(''); 
  const dispatch = useDispatch();
  
  // const cart = useSelector((state) => state.cart);
  // const cartItems = cart.cartItems;

  const handleAddItemtoCart = (product) => {
    dispatch(addItem({ id: product.id, price: product.price.id }));
  };

  const debounced = useDebouncedCallback(
    // function
    (value) => {
      setOtherInfo(value);
    },
    // delay in ms
    1000
  );


  useEffect(() => {
    
    
      dispatch(addOtherInfo({ id: product.id, price: product.price.id, otherinfo:otherinfo }));
  }, [otherinfo])


  
  // const handleOtherInfo = (event,product) => {
    
  //   setOtherInfo(event.target.value, );
            
  // //   setTimeout(function() { //Start the timer
  // //     console.log(product.otherinfo)
  // //   console.log(otherinfo)
  // //     // this.setState({render: true}) //After 1 second, set render to true
  // // }, 3000)
  //   // dispatch(addOtherInfo({ id: product.id, price: product.price.id, otherinfo:otherinfo }));
  // };

  const handleRemoveItemtoCart = (product) => {
    dispatch(removeItem({ id: product.id, price: product.price.id }));
  };

  return (
    <Paper
      sx={{
        p: 2,
        m: '20px',
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={3} className="Product_Text">
          <Card
            sx={{
              maxWidth: { sm: 180, md: 140, lg: 238 },
              mb: 0.5,
              minWidth: { sm: 180 },
            }}
          >
            <CardActionArea component={Link} to={`/product/${product.id}`}>
              <div className="Product_Image_Container">
                <img src={product.imageurl} alt={product.name} />
              </div>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} md={9} sm container>
          <Grid item xs={12} sm={12} md={12} className="Product_Text_Margin">
            <h4>{product.name}</h4>
          </Grid>
          <Grid item xs={12} sm={12} md={12} className="Product_Text_Margin">
            {product.price.types ? (
              <div
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  '& > *': {
                    margin: 0.5,
                  },
                }}
              >
                <Chip label={product.price.types} clickable color="primary" />
              </div>
            ) : (
              <></>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={4} className="Product_Text_Margin">
            <h4>₹ {product.price.price}</h4>
          </Grid>
          <Grid item xs={12} sm={12} md={4} className="Product_Text">
            <div className="Product_Increment">
              <Icon
                sx={{
                  cursor: 'pointer',
                }}
                onClick={(event) => {
                  handleRemoveItemtoCart(product);
                }}
              >
                remove_circle
              </Icon>
              <p>{product.quantity}</p>

              <Icon
                className="count_icon"
                sx={{
                  cursor: 'pointer',
                }}
                onClick={(event) => {
                  handleAddItemtoCart(product);
                }}
              >
                add_circle
              </Icon>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={4} className="Product_Text">
            <div>
              <h4>Total: ₹ {product.total}</h4>
            </div>
          </Grid>
          {product.other_information && 
          <Grid item xs={12} sm={12} md={12} className="Product_Text_Margin" 
           sx={{
            textAlign:'center'
          }}>           
            <TextField
          required
          id="otherinfo"
          placeholder={product.other_information}
          max
          defaultValue=''
          // value={otherinfo}
          onChange={(event) => {             
            // setOtherInfo(event.target.value );
            debounced(event.target.value)
          }}
        />
          </Grid>
        }
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CartItem;
