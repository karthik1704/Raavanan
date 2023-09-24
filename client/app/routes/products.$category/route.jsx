import {useLoaderData} from '@remix-run/react';
import { Typography, Grid } from '@mui/material';

import ProductList from '~/components/product-list';

export const loader = async ()=>{
  const res = await fetch('http://localhost:8000/api/products/');
  const products = await res.json();

  return {products}
}


//   root: {
//     marginTop: theme.spacing(1),
//   },
// }));

export default  function Index(){
  const {products} =  useLoaderData();
  console.log(products)

  return (
    <div>
      
      <Grid container sx={{ mt: 1 }}>
        <Grid item md={3} xl={3}></Grid>
        <Grid item xs={12} sm={12} md={9} xl={9}>
            <Grid container sx={{ mt: 1 }}>
              <ProductList products={products} />
            </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

