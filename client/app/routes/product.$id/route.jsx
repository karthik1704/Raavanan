import { Link, useLoaderData, NavLink } from '@remix-run/react';

import {
  Box,
  Button,
  Grid,
  Divider,
  Typography,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Stack,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@mui/material';

// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// import StoreIcon from '@mui/icons-material/Store';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { green } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

import ImageGallery from 'react-image-gallery';

import imageGalleryStyles from 'react-image-gallery/styles/css/image-gallery.css';
import { API_URL } from '~/config';
import { json } from '@remix-run/node';

export const loader = async ({ params }) => {
  const res = await fetch(`${API_URL}/api/products/detail/${params.id}`, {
    headers: { connection: 'keep-alive' },
  });
  const product = await res.json();

  return json({
    product,
  });
};

export const meta = ({ data }) => {
  const { product } = data;

  return [
    { title: `${product.selected.title} | இராவணன் அங்காடி` },
    {
      property: 'og:title',
      content: product.selected.title,
    },
    {
      name: 'description',
      content: product?.description,
    },
    {
      name: 'og:description',
      content: product?.description,
    },
    {
      name: 'og:image',
      content: product?.image ? product?.image : product?.selected?.image,
    },
  ];
};

export const links = () => [{ rel: 'stylesheet', href: imageGalleryStyles }];

const RootDiv = styled('div')(({ theme }) => ({
  margin: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    margin: '16px 0',
  },
}));

export default function Product() {
  const { product } = useLoaderData();

  return (
    <RootDiv>
      {product && (
        <div key={product.id}>
          <Grid container>
            <Grid
              item
              xs={12}
              md={6}
              lg={5}
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <div>
                <ImageGallery
                  items={product.selected.variant_images ? product.selected.variant_images : product.product_images}
                  thumbnailPosition={'left'}
                  showFullscreenButton={false}
                  showPlayButton={false}
                  autoPlay={false}
                  showNav={false}
                  style={{ maxHeight: '300px' }}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6} sx={{ p: '10px' }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {product.selected.title}
              </Typography>

              <Divider />

              <>
                <Typography variant="subtitle1">
                  அதிகபட்ச விற்பனை விலை: ₹ <del>{product.selected.mrp}</del>
                </Typography>
                <Typography variant="subtitle1">
                  தற்போதைய விலை: ₹ <b>{product.selected.price}</b>
                </Typography>
                <Divider />
                <Stack direction="row" spacing={2}>
                  {product.variants &&
                    product.variants.map((v) => (
                      <NavLink
                        key={v.id}
                        to={`/product/${v.variant_id}`}
                        style={{
                          marginTop: '1rem',
                          marginBottom: '1rem',
                          textDecoration: 'none',
                        }}
                      >
                        {({ isActive, isPending }) => (
                          <Paper
                            variant={'outlined'}
                            sx={{
                              p: 2,
                              textAlign: 'center',
                              textDecoration: 'none',
                              borderRadius: 2,
                              borderColor: isActive ? green[500] : '#000',
                              borderWidth: isActive ? 'medium' : 'thin',
                            }}
                          >
                            {v?.variant_name}
                          </Paper>
                        )}
                      </NavLink>
                    ))}
                </Stack>

                {/* <FormControl component="fieldset">
                  {product.price.length > 1 && (
                    <FormLabel component="legend" color="secondary">
                      அளவைத் தேர்ந்தெடுக்கவும் (அங்குலங்களில்)
                    </FormLabel>
                  )}

                  <RadioGroup
                    row
                    aria-label="position"
                    name="position"
                    defaultValue={product.price[0].types}
                  >
                    {product.price
                      .filter((price) => price.types !== null)
                      .map((price) => (
                        <FormControlLabel
                          key={price.id}
                          value={price.types}
                          control={<Radio color="primary" />}
                          label={price.types}
                          labelPlacement="end"
                        />
                      ))}
                  </RadioGroup>
                </FormControl> */}
              </>

              <div>
                <Typography variant="body1">இருப்பில் உள்ளது</Typography>
                {/* <Button
                  sx={{
                    m: 1,
                    backgroundColor: green[500],
                  }}
                  color="secondary"
                  justifycontent="flex-end"
                  variant="contained"
                  startIcon={<AddShoppingCartIcon />}
                  onClick={(event) => {
                    handleAddItemtoCart(product.id);
                  }}
                >
                  கூடை
                </Button> */}
                <Button
                  variant="contained"
                  startIcon={<WhatsAppIcon />}
                  // className={classes.whatsappBtn}
                  sx={{
                    my: '1rem',
                    backgroundColor: green[500],
                  }}
                  component={Link}
                  to={{
                    pathname: `/product/${product?.selected?.variant_id}/waorder`,
                  }}
                 
                >
                  பொருளை வாங்க
                </Button>
                <br />
              </div>
              <Divider />
              <Typography variant="body2">{product.description}</Typography>
              <Divider />
              {product?.selected?.variant_spec && (
                <>
                  <Typography variant="h6">பொருள் விவரங்கள் </Typography>
                  <Table size="small" aria-label="Product Detail table">
                    <TableHead>
                      {product.selected.variant_spec.map((spec) => (
                        <TableRow key={spec.id}>
                          <TableCell>{spec.key}</TableCell>
                          <TableCell>{spec.value}</TableCell>
                        </TableRow>
                      ))}
                    </TableHead>
                  </Table>{' '}
                </>
              )}
                {!product?.selected?.variant_spec && product?.product_spec && (
                <>
                  <Typography variant="h6">பொருள் விவரங்கள் </Typography>
                  <Table size="small" aria-label="Product Detail table">
                    <TableHead>
                      {product.product_spec.map((spec) => (
                        <TableRow key={spec.id}>
                          <TableCell>{spec.key}</TableCell>
                          <TableCell>{spec.value}</TableCell>
                        </TableRow>
                      ))}
                    </TableHead>
                  </Table>{' '}
                </>
              )}
            </Grid>
          </Grid>
        </div>
      )}
    </RootDiv>
  );
}
