import { useLoaderData, Outlet } from "@remix-run/react";
import {Box, Grid} from '@mui/material';

import Carousel from '~/components/carousel';
import slideshow from 'react-slideshow-image/dist/styles.css';

export const links = ()=>(
    [
        { rel: 'stylesheet', href: slideshow },
    ]
)


export default function Index(){
    return(
        <Box sx={{ maxWidth: '100%' }}>
      
        <div>
          <Carousel />
        </div>
        <Grid container sx={{ mt: 1 }}>
          {/* <ProductList products={products} /> */}
        </Grid>
      </Box>
    )
}







