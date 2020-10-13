import React from 'react';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { useSelector } from 'react-redux';

import Carousel from '../../components/carousel/Carousel';
import ProductList from '../../components/productList/ProductList';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
  },
}));

const Home = () => {
  const { products } = useSelector((state) => state.products);

  const classes = useStyles();
  return (
    <div>
      <div>
        <Carousel />
      </div>
      <Grid container className={classes.root}>
        <ProductList products={products} />
      </Grid>
    </div>
  );
};

export default Home;
