import {
  Button,
  Box,
  Badge,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
  Grid,
  Typography,
  Skeleton,
} from '@mui/material';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { Link } from '@remix-run/react';

import { styled } from '@mui/material/styles';

const CenterContent = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0 auto',
}));

const Img = styled('img')('');

const ProductList = ({ products }) => {
  return (
    <>
      {products &&
        products.map((product, i) => (
          <Grid item xs={6} sm={2} md={2} xl={2} key={i} sx={{ ml: 2, gap: 2 }}>
            <Card
              key={i}
              sx={{
                gap: 2,
                maxWidth: '140px',
              }}
              elevation={0}
            >
              <CardActionArea
                component={Link}
                to={`/product/${product?.variant_id}`}
                sx={{
                  '&:hover ': {
                    backgroundColor: '#fff',
                  },
                  '&:focus': {
                    backgroundColor: 'white',}
                }}
              >
                {product.price && product.discount !== '0' && (
                  <Badge
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    color="primary"
                    overlap="circular"
                    // badgeContent={`${product?.discount_percentage}%`}
                    badgeContent={`10%`}
                    variant="standard"
                    sx={{
                      borderRadius: '50%',
                      right: '6%',
                      display: 'contents',
                    }}
                  ></Badge>
                )}

                {product?.image || product?.product_image ? (
                  <CardMedia
                    sx={{
                      aspectRatio: 'unset',
                      maxWidth: '140px',
                      borderRadius: 2,
                      overflow: 'hidden',
                    }}
                    component="img"
                    alt={product.title}
                    height="200"
                    image={
                      product?.image ? product.image : product?.product_image
                    }
                  />
                ) : (
                  <Skeleton variant="rectangular" width={200} height={200} />
                )}

                <CardContent
                  sx={{
                    p: 0.5,
                    '&:hover': {
                      backgroundColor: '#fff',
                    },
                  }}
                >
                  <Typography
                    variant="body1"
                    color="textPrimary"
                    sx={{
                      my: '5px',
                      fontSize: '11px',
                      fontWeight: 'bold',
                    }}
                  >
                    {product.short_name}
                  </Typography>
                  {/* <Typography
                    sx={{
                      textAlign: 'center',
                      fontWeight: 500,
                      fontSize: '13px',
                    }}
                    variant="subtitle1"
                    color="textPrimary"
                  >
                    {product?.price && (
                      <span>
                        {' '}
                        ₹ {product.price} - &nbsp;
                        <Box
                          component="span"
                          sx={{
                            textDecoration: 'line-through',
                            fontSize: '11px',
                          }}
                        >
                          ₹ {product?.mrp}
                        </Box>
                      </span>
                    )}
                  </Typography>*/}
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
    </>
  );
};

export default ProductList;

/* */
