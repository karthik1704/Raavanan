/* eslint-disable react/jsx-one-expression-per-line */
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { useSelector, useDispatch } from 'react-redux';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import { Link } from 'react-router-dom';

import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import { addItem } from '../../data/actions/cartActions';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 238,
    margin: theme.spacing(0.5),
    // [theme.breakpoints.down('sm')]: {
    //   maxWidth: 140,
    // },
    // [theme.breakpoints.up('sm')]: {
    //   minWidth: 180,
    // },
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
  frameImage: {
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
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
  },
  content:{
    padding: '0.5rem auto'
  },
  title: {
    textAlign: 'center',
    fontSize: '12px',
    marginBottom: '1px',
    fontWeight:'bold',

    [theme.breakpoints.down('sm')]: {
      fontSize: '0.6rem',
      fontWeight: 600,
    },
  },
  price: {
    textAlign: 'center',
    fontWeight: 500,
    fontSize: '13px',
  },
  cardButtons: {
    display: 'flex',
    justifyContent: 'center',
  },
  cartBtn: {
    color: 'white',
    background: '#43a047',
    paddingLeft: '10px',
    fontSize : '10px'

  },
  shapeCircle: {
    borderRadius: '50%',
    left: '6%',
    display: 'contents',
  },
  mrp : {
    textDecoration:'line-through',
    fontSize : '11px',
    // fontWeight: '300'
    
  }
  
}));

const ProductList = ({ products }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  return (
    <>
    
      {products.map((product, i) => {
        return <Grid item xs={6} sm={4} md={3} xl={3} key={i}>
          <Card className={classes.root}>
          
            <CardActionArea component={Link} to={`/product/${product.slug ? product.slug : product.id}`}>
            {product['price'].length > 0 && product.price[0].discount !=0 && (
             
                         <Badge  anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }} color="primary" overlap="circle" badgeContent= {`${product.price[0].discount}%`}  variant="standard" className={classes.shapeCircle}>
                             
                            </Badge>
                  )}
         
              <div className={classes.center}>
            
                <img
                  src={product.imageurl}
                  alt={product.name}
                  className={
                    product.category &&
                    product.category.name !== 'கைபேசி உறை'
                      ? classes.frameImage
                      : classes.media
                  }
                />
              </div>
              <CardContent className={classes.content}>
                <Typography
                  variant="body1"
                  color="textPrimary"
                  className={classes.title}
                >
                  
                    {product.name.split('|')[0]}
                   
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="textPrimary"
                  className={classes.price} 
                >
                  
                  
                  
                  
                   {product['price'].length > 0 &&(
                    <span> ₹ {product.price[0].price} - &nbsp;
                    <span className={classes.mrp}>
                    ₹ {product.price[0].mrp}
                    </span>
                    </span>
                 )} 
                  
                 {/* ₹{product.price[0].id} */}
                  
                </Typography>
              </CardContent>
            </CardActionArea>

            <CardActions className={classes.cardButtons}>
              
              
              <Button color="primary" className={classes.cartBtn}  justifycontent="center" startIcon={<AddShoppingCartIcon />} onClick={() => dispatch(addItem({...product, price : product.price[0].id}))}>
                கூடை
              </Button>
            </CardActions>
          </Card>
        </Grid>
})}

    </>
  );
};

export default ProductList;

/* */
