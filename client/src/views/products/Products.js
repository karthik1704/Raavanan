/* eslint-disable react/jsx-one-expression-per-line */
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

// import InfiniteScroll from 'react-infinite-scroll-component';

import axios from 'axios';

import { API_URL } from '../../CONSTANTS';

import { Helmet } from 'react-helmet';

import { fetchProduct, resetProduct } from '../../data/actions/productActions';
import ProductList from '../../components/productList/ProductList';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     marginTop: theme.spacing(1),
//   },
// }));

const Products = () => {
  const { products } = useSelector((state) => state.products);
  const { category } = useParams();
  const dispatch = useDispatch();

  const filterUrl = `${API_URL}api/product/?category__slug=${category}`;
  const url = `${API_URL}api/product/`;

  useEffect(() => {
    dispatch(resetProduct([]));
  }, [dispatch, category]);

  useEffect(() => {
    axios.get(category === 'new' ? url : filterUrl).then((res) => {
      return dispatch(fetchProduct(res.data.results));
    });
  }, [dispatch, category, url, filterUrl]);

  return (
    <div>
      <Helmet>
        <title>இராவணன் அங்காடி | {category}</title>
      </Helmet>
      <Grid
        container
        sx={{
          marginTop: 1,
        }}
      >
        {products?.length !== 0 ? (
          <ProductList products={products} />
        ) : (
          <Typography>விரைவில்...</Typography>
        )}
      </Grid>
    </div>
  );
};

export default Products;
