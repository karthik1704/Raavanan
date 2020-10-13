/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import { Link } from 'react-router-dom';

import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 180,
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      maxWidth: 140,
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: 180,
    },
  },
  media: {
    width: 100,
    height: 200,
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
  },
  title: {
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8rem',
      fontWeight: 400,
    },
  },
  price: {
    textAlign: 'center',
    fontWeight: 500,
  },
  cardButtons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const ProductList = ({ products }) => {
  const classes = useStyles();
  return (
    <>
      {products.map((product) => (
        <Grid item xs={6} sm={4} md={2} key={product.id}>
          <Card className={classes.root}>
            <CardActionArea component={Link} to={`/product/${product.id}`}>
              <div className={classes.center}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className={classes.media}
                />
              </div>
              <CardContent>
                <Typography
                  variant="p"
                  color="textPrimary"
                  className={classes.title}
                >
                  {product.name.length >= 10
                    ? `${product.name.substring(0, 10)}...`
                    : product.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="textPrimary"
                  className={classes.price}
                >
                  ₹{'  '}
                  {product.price}
                </Typography>
              </CardContent>
            </CardActionArea>

            <CardActions className={classes.cardButtons}>
              <Button color="secondary" startIcon={<AddShoppingCartIcon />}>
                கூடை
              </Button>
              <IconButton aria-label="add to favorites">
                <FavoriteBorderOutlinedIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </>
  );
};

export default ProductList;

/* */
