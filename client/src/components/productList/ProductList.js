import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import  Grid  from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import  Typography  from '@material-ui/core/Typography';

import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';


import {makeStyles} from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 160,
      marginBottom: theme.spacing(1),
      [theme.breakpoints.up('sm')]: {
        minWidth: 160,
      }
    },
    media: {
      width: 100,
      height: 200,     
    },
    center: {
      display:'flex',
      justifyContent:'center',
      alignItems: 'center',
      margin: '0 auto',
    }
  }));

const ProductList = ({products}) => {
    const classes = useStyles();
    return (
       <>
       {products.map(product => (
        <Grid item xs={12} sm={4} md={2} key={product.id} >

        <Card  className={classes.root} >
                <div className={classes.center}>
                  <img src={product.imageUrl} alt={product.name} className={classes.media} />
                  </div>
                  <CardContent>
                      <Typography variant='h6' color="textPrimary" >
                          {product.name}
                      </Typography>
                      <Typography variant='subtitle1' color="textPrimary" >
                       ₹{product.price}
                      </Typography>

                  </CardContent>
                  <CardActions>
                  <IconButton aria-label="add to favorites">
                    <FavoriteBorderOutlinedIcon />

                  </IconButton>
                  </CardActions>
                  
          </Card>
        </Grid> 
      ))}   
     </>
    )
}

export default ProductList;

  /* */