import { useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';

import { fetchProduct } from '../../data/actions/productActions';

import Carousel from '../../components/carousel/Carousel';
import ProductList from '../../components/productList/ProductList';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
  },
}));

const Home = () => {
  const { products } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    // fetch('http://localhost:8000/api/product.json')
    //   .then((res) => res.json())
    //   .then((data) => dispatch(fetchProduct(data.results)))
    //   .catch((err) => console.log(err));

    axios
      .get('http://localhost:8000/api/product')
      .then((res) => dispatch(fetchProduct(res.data.results)));
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
