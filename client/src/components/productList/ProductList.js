import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { addItem } from '../../data/actions/cartActions';

import { styled } from '@mui/material/styles';

const CenterContent = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0 auto',
}));

const Img = styled('img')('');

const ProductList = ({ products }) => {
  const dispatch = useDispatch();

  return (
    <>
      {products.map((product, i) => {
        return (
          <Grid item xs={6} sm={4} md={3} xl={3} key={i}>
            <Card
              sx={{
                margin: 0.5,
              }}
            >
              <CardActionArea
                component={Link}
                to={`/product/${product.slug ? product.slug : product.id}`}
              >
                {product['price'].length > 0 &&
                  product.price[0].discount !== 0 && (
                    <Badge
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      color="primary"
                      overlap="circular"
                      badgeContent={`${product.price[0].discount}%`}
                      variant="standard"
                      sx={{
                        borderRadius: '50%',
                        left: '6%',
                        display: 'contents',
                      }}
                    ></Badge>
                  )}

                <CenterContent>
                  <Img
                    src={product.imageurl}
                    alt={product.name}
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
                      fontSize: { sm: '0.6rem', md: '12px' },
                      marginBottom: '1px',
                      fontWeight: { sm: 600, md: 'bold' },
                    }}
                  >
                    {product.name.split('|')[0]}
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
                    {product['price'].length > 0 && (
                      <span>
                        {' '}
                        ₹ {product.price[0].price} - &nbsp;
                        <Box
                          component="span"
                          sx={{
                            textDecoration: 'line-through',
                            fontSize: '11px',
                          }}
                        >
                          ₹ {product.price[0].mrp}
                        </Box>
                      </span>
                    )}

                    {/* ₹{product.price[0].id} */}
                  </Typography>
                </CardContent>
              </CardActionArea>

              <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  sx={{
                    color: 'white',
                    background: '#43a047',
                    paddingLeft: '10px',
                    fontSize: '10px',
                  }}
                  color="primary"
                  justifycontent="center"
                  startIcon={<AddShoppingCartIcon />}
                  onClick={() =>
                    dispatch(
                      addItem({ ...product, price: product.price[0].id })
                    )
                  }
                >
                  கூடை
                </Button>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </>
  );
};

export default ProductList;

/* */
