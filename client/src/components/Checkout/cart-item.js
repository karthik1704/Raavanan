import { Link } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import { addItem, removeItem } from '../../data/actions/cartActions';
import { useDispatch } from 'react-redux';

import { styled } from '@mui/material/styles';

const ChipDiv = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  '& > *': {
    margin: theme.spacing(0.5),
  },
}));

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
  const dispatch = useDispatch();
  // const cart = useSelector((state) => state.cart);
  // const cartItems = cart.cartItems;

  const handleAddItemtoCart = (product) => {
    dispatch(addItem({ id: product.id, price: product.price.id }));
  };

  const handleRemoveItemtoCart = (product) => {
    dispatch(removeItem({ id: product.id, price: product.price.id }));
  };

  return (
    <Paper
      sx={{
        padding: 2,
        margin: '20px',
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={3} className="Product_Text">
          <Card>
            <CardActionArea component={Link} to={`/product/${product.id}`}>
              <div className="Product_ImageContainer">
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
              <ChipDiv>
                <Chip label={product.price.types} clickable color="primary" />
              </ChipDiv>
            ) : (
              <></>
            )}
          </Grid>

          <Grid item xs={12} sm={12} md={4} className="Product_Text_Margin">
            <h4>Price : ₹ {product.price.price}</h4>
          </Grid>
          <Grid item xs={12} sm={12} md={4} className="Product_Text">
            <div className="Product_Text">
              {/* <Icon className= {classes.icon} onClick={(event) => { handleRemoveItemtoCart(product)}}>remove_circle</Icon> */}
              <h4>Quantity : {product.quantity}</h4>

              {/* <Icon className={classes.icon}  onClick={(event) => { handleAddItemtoCart(product)}}>add_circle</Icon> */}
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={4} className="Product_Text">
            <div>
              <h4>Total: ₹ {product.total}</h4>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CartItem;
