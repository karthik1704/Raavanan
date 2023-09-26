import {useLoaderData} from '@remix-run/react';
import { Typography, Grid } from '@mui/material';

import ProductList from '~/components/product-list';

import { API_URL } from '~/config';

export const loader = async ({params})=>{
  const res = await fetch(`${API_URL}/api/products/`);
  const c_res = await fetch(`${API_URL}/api/category/`);
  const products = await res.json();

  return {products}
}

export const meta = ({data, matches})=>{
  const category = matches.find(
    (match) => match.id === "root"
  ).category;
  console.log(category)
return [ { title: `${category?.name} | இராவணன் அங்காடி` },
{
  property: "og:title",
  content: "தனியுரிமைக் கொள்கைகள்",
},
{
  name: "description",
  content: `எங்களது தளத்தை பயன்படுத்துவதற்கு உங்களுக்கு நன்றி கூறிக் கொள்கிறோம்.
  எங்களது தளத்தில் உங்களிடமிருந்து சேகரிக்கப்பட்ட தனிப்பட்ட தகவல்களை
  நாங்கள் எவ்வாறு கையாளுகிறோம் என்பதை இந்த தனியுரிமைக் கொள்கைகள்
  விவரிக்கிறது...`,
},]
}

//     marginTop: theme.spacing(1),
//   },
// }));

export default  function Index(){
  const {products} =  useLoaderData();

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

