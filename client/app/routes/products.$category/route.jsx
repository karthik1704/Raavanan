import {useLoaderData} from '@remix-run/react';
import { Typography, Grid } from '@mui/material';

import ProductList from '~/components/product-list';

import { API_URL } from '~/config';

export const loader = async ({params})=>{
  const res = await fetch(`${API_URL}/api/products/category/${params.category}/`, {
    headers: { connection: "keep-alive" } 
  });
  const categoryRes = await fetch(`${API_URL}/api/category/${params.category}/`, {
    headers: { connection: "keep-alive" } 
  });
  const products = await res.json();
  const category = await categoryRes.json();

  return {products, category}
}

export const meta = ({data, matches})=>{
  const category = data.category
return [ { title: `${category?.name} | இராவணன் அங்காடி` },
{
  property: "og:title",
  content: category.name,
},
{
  name: "description",
  content: category?.description,
},
{
  name: "og:description",
  content: category?.description,
},
{
  name: "keywords",
  content: category?.keywords,
},
]
}


export default  function Index(){
  const {products} =  useLoaderData();

  return (
    <div>
      {products && 
      <Grid container sx={{ mt: 1 }}>
        <Grid item md={3} xl={3}></Grid>
        <Grid item xs={12} sm={12} md={9} xl={9}>
            <Grid container sx={{ mt: 1 }}>
              <ProductList products={products} />
            </Grid>
        </Grid>
      </Grid>}
      {!products && 'LOADING'}
    </div>
  );
};

