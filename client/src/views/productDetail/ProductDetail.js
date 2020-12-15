/* eslint-disable react/jsx-one-expression-per-line */
import { useEffect } from 'react';

import Button from '@material-ui/core/Button';
// import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
// import StoreIcon from '@material-ui/icons/Store';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

// import green from '@material-ui/core/colors/green';

import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { API_URL } from '../../CONSTANTS';

import { Helmet } from 'react-helmet';

import { fetchProductDetail } from '../../data/actions/productActions';

import useStyles from './styles';

const ProductDetail = () => {
  const { id } = useParams();
  const { productDetail } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    // fetch(`http://localhost:8000/api/product/${id}`)
    //   .then((res) => res.json())
    //   .then((data) => dispatch(fetchProductDetail(data)))
    //   .catch((err) => console.log(err));

    axios
      .get(`${API_URL}api/product/${id}`)
      .then((res) => dispatch(fetchProductDetail(res.data)));

    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => dispatch(fetchProductDetail({}));
  }, [dispatch]);

  if (Object.keys(productDetail).length === 0) {
    return <div />;
  }

  return (
    <div className={classes.root}>
      <Helmet>
        <title>
          இராவணன் அங்காடி | {ProductDetail && productDetail.product_name}
        </title>
      </Helmet>
      {productDetail && (
        <div key={productDetail.id}>
          <Grid container>
            <Grid item xs={12} md={6} lg={5}>
              <div className={classes.center}>
                <img
                  src={productDetail.imageurl}
                  alt={productDetail.name}
                  className={
                    productDetail.category &&
                    productDetail.category.category_name !== 'கைபேசி உறை'
                      ? classes.frameImage
                      : classes.productImage
                  }
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">{productDetail.product_name}</Typography>
              {/* <Typography variant="subtitle1">
                category: {product.category}
              </Typography> */}
              <Divider />
              {productDetail.category &&
                productDetail.category.category_name !== 'படச்சட்டகம்' && (
                  <>
                    <Typography variant="subtitle1">
                      அதிகபட்ச விற்பனை விலை: ₹ <del>{productDetail.mrp}</del>
                    </Typography>
                    <Typography variant="subtitle1">
                      தற்போதைய விலை: ₹ <b>{productDetail.price}</b>
                    </Typography>
                    <Divider />
                  </>
                )}

              <div>
                <Typography variant="body1">இருப்பில் உள்ளது</Typography>
                <Button
                  variant="contained"
                  startIcon={<WhatsAppIcon />}
                  className={classes.whatsappBtn}
                  component={Link}
                  to={`/${productDetail.id}/waorder`}
                >
                  பொருளை வாங்க
                </Button>

                {/* <div className={classes.buttons}>
                  <Button
                    variant="contained"
                    startIcon={<AddShoppingCartIcon />}
                  >
                    Add To Cart
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<StoreIcon />}
                  >
                    Buy Now
                  </Button>
                </div> */}
                <br />
              </div>
              <Divider />
              <Typography variant="body2">
                {productDetail.description}
              </Typography>
              <Divider />
              <Typography variant="h6">பொருள் விவரங்கள் </Typography>
              <Table size="small" aria-label="Product Detail table">
                <TableHead>
                  <TableRow>
                    <TableCell>தயாரிப்பு</TableCell>
                    <TableCell>{productDetail.manufacturer}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>வியாபாரக் குறி</TableCell>

                    <TableCell>{productDetail.brand}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>தகுதியான சாதனங்கள்</TableCell>
                    <TableCell>{productDetail.supported_devices}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>எண்ணிக்கை </TableCell>

                    <TableCell>{productDetail.quantity}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>மூலப்பொருள் </TableCell>
                    <TableCell>
                      {productDetail.materials &&
                        productDetail.materials.map((material) => (
                          <span key={material.id}>
                            {' '}
                            {material.material_name}{' '}
                          </span>
                        ))}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>வகை </TableCell>
                    <TableCell>
                      {productDetail.category &&
                        productDetail.category.category_name}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>தோற்றம் </TableCell>
                    <TableCell>{productDetail.origin}</TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
