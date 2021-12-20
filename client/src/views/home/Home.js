import { useEffect, Suspense } from 'react';

// MUI
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// RTK
import { useDispatch } from 'react-redux';
import { useGetProductsQuery } from '../../features/product/productApi';
import { toggleLoader } from '../../features/loader/loaderSlice';

// Compoents
import Carousel from '../../components/carousel/Carousel';
import ProductList from '../../components/productList/ProductList';

const Home = () => {
  const { data, isLoading } = useGetProductsQuery({ slug: null, page: null });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleLoader(isLoading));
  }, [dispatch, isLoading]);

  return (
    <Box sx={{ maxWidth: '100%' }}>
      <div>
        <Carousel />
      </div>
      <Suspense fallback={'Loading...'}>
        <Grid container sx={{ mt: 1 }}>
          {data && <ProductList products={data?.results} />}
        </Grid>
      </Suspense>
    </Box>
  );
};

export default Home;
