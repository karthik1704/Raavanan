import { useLoaderData, Outlet } from "@remix-run/react";
import {Box, Grid, Typography} from '@mui/material';

import ProductList from "~/components/product-list";

import Carousel from '~/components/carousel';
import slideshow from 'react-slideshow-image/dist/styles.css';

import { API_URL } from '~/config';

export const links = ()=>(
    [
        { rel: 'stylesheet', href: slideshow },
    ]
)

export const loader = async () => {
  const res = await fetch(`${API_URL}/api/banner/`, {headers: { connection: "keep-alive" } });
  const banner = await res.json()
  const trendingRes = await fetch(`${API_URL}/api/products/trending/`, {headers: { connection: "keep-alive" } });
  const trending = await trendingRes.json()
  const newRes = await fetch(`${API_URL}/api/products/new/`, {headers: { connection: "keep-alive" } });
  const newProduct = await newRes.json()
  return {banner, trending, newProduct}
}

export default function Index(){
  const {newProduct, trending} = useLoaderData()
    return(
        <Box sx={{ maxWidth: '100%' }}>
      
        <div>
          <Carousel />
        </div>
          <Typography variant="h4">Trending</Typography>
        <Grid container sx={{ mt: 1 , mb:2}}>
          <ProductList products={trending} />
        </Grid>
        <Typography variant="h4">New </Typography>
        <Grid container sx={{ my: 1 }}>

          <ProductList products={newProduct} />
        </Grid>
      </Box>
    )
}







