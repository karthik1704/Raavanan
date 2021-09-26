import { useEffect } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';

import { API_URL } from '../../CONSTANTS';

import { fetchProduct, resetProduct } from '../../data/actions/productActions';

import useTopLoader from '../../hooks/useTopLoader';
import Carousel from '../../components/carousel/Carousel';
import ProductList from '../../components/productList/ProductList';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     marginTop: theme.spacing(1),
//   },
//   fullWidth : {
//     maxWidth : '100%'
//   },
//   maxWidthLg : {
//     maxWidth : '100%'
//   }
// }));

const Home = () => {
  const { products } = useSelector((state) => state.products);
  const [, onToggleTopLoader] = useTopLoader();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetProduct([]));
    axios.get(`${API_URL}api/product`).then((res) => {
      onToggleTopLoader(false);
      return dispatch(fetchProduct(res.data.results));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <Box sx={{ maxWidth: '100%' }}>
      <div>
        <Carousel />
      </div>
      <Grid container sx={{ mt: 1 }}>
        <ProductList products={products} />
      </Grid>
    </Box>
  );
};

export default Home;
