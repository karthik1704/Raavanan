// import Link from '@material-ui/core/Link';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Chip from '@material-ui/core/Chip';
import { addItem, removeItem } from '../../data/actions/cartActions';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 238,
    marginBottom: theme.spacing(0.5),
    [theme.breakpoints.down('sm')]: {
      maxWidth: 140,
    },
    [theme.breakpoints.up('sm')]: {
      minWidth: 180,
    },
  },
  paper: {
    padding: theme.spacing(2),
    margin: '20px',
    
  },
  chip:{
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  media: {
    marginTop: '5px',
    paddingTop: 10,
    paddingRight: 10,
    [theme.breakpoints.down('sm')]: {
      width: 150,
      height: 150,
    },
    width: 200,
    height: 200,
  
  },
  icon : {
    cursor:'pointer'
  }
}));

const CartItem = ({product}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  // const cart = useSelector((state) => state.cart);
  // const cartItems = cart.cartItems;

  const handleAddItemtoCart = (product) =>  {

    
    dispatch(addItem({id : product.id,price: product.price.id}))
 

}

const handleRemoveItemtoCart = (product) =>  {

    
  dispatch(removeItem({id : product.id,price: product.price.id}))


}



  return (
  
    <Paper className={classes.paper}>
<Grid container spacing={2}>
      
<Grid item xs={12} sm={12} md={3} className="Product_Text" >
<Card className={classes.root}>
<CardActionArea component={Link} to={`/product/${product.id}`}>
<div className="Product_Image_Container" >
    <img  src={product.imageurl}/>
</div>
</CardActionArea>
</Card>
</Grid>
<Grid item xs={12} md={9} sm container>
<Grid item  xs={12} sm={12} md={12} className="Product_Text_Margin">

<h4>{product.name}</h4>


</Grid>
<Grid item  xs={12} sm={12} md={12} className="Product_Text_Margin">
    {
      product.price.types ?
    <div className={classes.chip}>
  <Chip 
       
        label={product.price.types}
        clickable
        color="primary"
        
      />
      </div>
      :
      <></>
    }


</Grid>
  <Grid item  xs={12} sm={12} md={4} className="Product_Text_Margin">
    
<h4>₹ {product.price.price}</h4>

</Grid>
<Grid item  xs={12} sm={12} md={4} className="Product_Text">
<div className="Product_Increment">
<Icon className= {classes.icon} onClick={(event) => { handleRemoveItemtoCart(product)}}>remove_circle</Icon>
<p>{product.quantity}</p>

<Icon className={`count_icon ${classes.icon}`}  onClick={(event) => { handleAddItemtoCart(product)}}>add_circle</Icon>
</div>
</Grid>
<Grid item  xs={12} sm={12} md={4} className="Product_Text">
<div >
<h4>Total: ₹ {product.total}</h4>
</div>
</Grid>
</Grid>


</Grid>
</Paper>
  );
};

export default CartItem;
