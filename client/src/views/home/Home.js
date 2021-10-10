import { useEffect } from 'react';

// MUI
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// RTK
import { useGetProductsQuery } from '../../features/product/productApi';

// Custom hooks
import useTopLoader from '../../hooks/useTopLoader';

// Compoents
import Carousel from '../../components/carousel/Carousel';
import ProductList from '../../components/productList/ProductList';

const Home = () => {
  const [, onToggleTopLoader] = useTopLoader();

  const { data, isLoading } = useGetProductsQuery({ slug: null, page: null });

  useEffect(() => {
    onToggleTopLoader(isLoading);
  }, [isLoading]);

  return (
    <Box sx={{ maxWidth: '100%' }}>
      <div>
        <Carousel />
      </div>
      <Grid container sx={{ mt: 1 }}>
        {data && <ProductList products={data?.results} />}
      </Grid>
    </Box>
  );
};

export default Home;
