import { useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';

import { API_URL } from '../../CONSTANTS';

import { fetchProduct, resetProduct } from '../../data/actions/productActions';

import useTopLoader from '../../hooks/useTopLoader';

import Carousel from '../../components/carousel/Carousel';
import ProductList from '../../components/productList/ProductList';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
  },
}));

const Home = () => {
  const { products } = useSelector((state) => state.products);
  const [loading, onToggleTopLoader] = useTopLoader();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetProduct([]));
    axios.get(`${API_URL}api/product`).then((res) => {
      onToggleTopLoader(false);
      return dispatch(fetchProduct(res.data.results));
    });
  }, [dispatch]);

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
