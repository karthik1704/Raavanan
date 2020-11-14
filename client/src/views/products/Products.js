/* eslint-disable react/jsx-one-expression-per-line */
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios';

import { fetchProduct } from '../../data/actions/productActions';
import ProductList from '../../components/productList/ProductList';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
  },
}));

const Products = () => {
  const { products } = useSelector((state) => state.products);
  const { category } = useParams();
  const dispatch = useDispatch();

  const filterUrl = `http://localhost:8000/api/product/?category__slug=${category}&category__parent_category=`;
  const url = 'http://localhost:8000/api/product/';

  useEffect(() => {
    axios.get(category === 'new' ? url : filterUrl).then((res) => {
      return dispatch(fetchProduct(res.data.results));
    });
  }, [dispatch, category, filterUrl]);

  const classes = useStyles();

  return (
    <div>
      <Grid container className={classes.root}>
        {products.length !== 0 ? (
          <ProductList products={products} />
        ) : (
          <Typography>Coming Soon...</Typography>
        )}
      </Grid>
    </div>
  );
};

export default Products;
