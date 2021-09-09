import Button from '@mui/material/Button';
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

// const useStyles = makeStyles((theme) => ({
//   root: {
//     // maxWidth: 238,
//     margin: theme.spacing(0.5),
//     // [theme.breakpoints.down('sm')]: {
//     //   maxWidth: 140,
//     // },
//     // [theme.breakpoints.up('sm')]: {
//     //   minWidth: 180,
//     // },
//   },
//   media: {
//     marginTop: '5px',
//     paddingTop: 10,
//     paddingRight: 10,
//     [theme.breakpoints.down('md')]: {
//       width: 150,
//       height: 150,
//     },
//     width: 200,
//     height: 200,
//   },
//   frameImage: {
//     marginTop: '5px',
//     paddingTop: 10,
//     paddingRight: 10,
//     [theme.breakpoints.down('md')]: {
//       width: 150,
//       height: 150,
//     },
//     width: 200,
//     height: 200,
//   },
//   center: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     margin: '0 auto',
//   },
//   content: {
//     padding: '0.5rem auto',
//   },
//   title: {
//     textAlign: 'center',
//     fontSize: '12px',
//     marginBottom: '1px',
//     fontWeight: 'bold',

//     [theme.breakpoints.down('md')]: {
//       fontSize: '0.6rem',
//       fontWeight: 600,
//     },
//   },
//   price: {
//     textAlign: 'center',
//     fontWeight: 500,
//     fontSize: '13px',
//   },
//   cardButtons: {
//     display: 'flex',
//     justifyContent: 'center',
//   },
//   cartBtn: {
//     color: 'white',
//     background: '#43a047',
//     paddingLeft: '10px',
//     fontSize: '10px',
//   },
//   shapeCircle: {
//     borderRadius: '50%',
//     left: '6%',
//     display: 'contents',
//   },
// }));

const ProductList = ({ products }) => {
  const dispatch = useDispatch();
  // console.log(products);
  // products.map((product) => (
  //   console.log(product.price[0].price)
  // ))
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
                      pt: 10,
                      pr: 10,
                      width: {
                        sm: '100px',
                        md: 200,
                      },
                      height: {
                        sm: '100px',
                        md: 200,
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
                    variant="subtitle1"
                    color="textPrimary"
                    sx={{
                      textAlign: 'center',
                      fontWeight: 500,
                      fontSize: '13px',
                    }}
                  >
                    {product['price'].length > 0 &&
                      `₹ ${product.price[0].price}`}

                    {/* ₹{product.price[0].id} */}
                  </Typography>
                </CardContent>
              </CardActionArea>

              <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                {/* <IconButton aria-label="add to favorites">
                <FavoriteBorderOutlinedIcon />
              </IconButton> */}
                <Button
                  color="primary"
                  sx={{
                    color: 'white',
                    background: '#43a047',
                    paddingLeft: '10px',
                    fontSize: '10px',
                  }}
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
