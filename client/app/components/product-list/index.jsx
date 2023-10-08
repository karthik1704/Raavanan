import {
  Button,
  Box,
  Badge,
  Card,
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
          <Grid item xs={6} sm={2} md={2} xl={2} key={i}>
            <Card
              sx={{
                gap:2
              }}
              elevation={0}
            >
              <CardActionArea
                component={Link}
                to={`/product/${product?.variant_id}`}
              >
                {product.price && product.discount !== '0' && (
                  <Badge
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    color="primary"
                    overlap="circular"
                    badgeContent={`${product?.discount_percentage}%`}
                    variant="standard"
                    sx={{
                      borderRadius: '50%',
                      left: '6%',
                      display: 'contents',
                    }}
                  ></Badge>
                )}

                <CenterContent>
                  {product?.image || product?.product_image ? (
                    <Img
                      src={
                        product?.image ? product.image : product?.product_image
                      }
                      alt={product.title}
                      sx={{
                        mt: '5px',
                        pt: 1.2,
                        pr: 1.2,
                        width: {
                          xs: '150px',
                          md: '200px',
                        },
                        height: {
                          xs: '150px',
                          md: '200px',
                        },
                      }}
                    />
                  ) : (
                    <Skeleton variant="rectangular" width={200} height={200} />
                  )}
                </CenterContent>
                <CardContent
                  sx={{
                    padding: '0.5rem auto',
                  }}
                >
                  <Typography
                    variant="body1"
                    color="textPrimary"
                    sx={{
                      textAlign: 'center',
                      // fontSize: { sm: '0.6rem', md: '12px' },
                      marginBottom: '1px',
                      // fontWeight: { sm: 600, md: 'bold' },
                      fontWeight: 'bold',
                      fontSize: '12px',
                    }}
                  >
                    {product.product_name}
                  </Typography>
                  <Typography
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
                  </Typography>
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
