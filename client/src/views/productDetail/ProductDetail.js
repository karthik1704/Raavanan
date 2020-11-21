/* eslint-disable react/jsx-one-expression-per-line */
import { useEffect } from 'react';

import Button from '@material-ui/core/Button';
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
  }, [dispatch]);

  return (
    <div>
      {productDetail && (
        <div key={productDetail.id}>
          <Grid container>
            <Grid item xs={12} md={6} lg={5}>
              <div>
                <img
                  src={productDetail.imageurl}
                  alt={productDetail.name}
                  className={classes.productImage}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">{productDetail.product_name}</Typography>
              {/* <Typography variant="subtitle1">
                category: {product.category}
              </Typography> */}
              <Divider />
              <Typography variant="subtitle1">
                M.R.P.: ₹ <del>{productDetail.mrp}</del>
              </Typography>
              <Typography variant="subtitle1">
                Price: ₹ <b>{productDetail.price}</b>
              </Typography>
              <Divider />
              <div>
                <Typography variant="body1">In stock</Typography>

                <Button
                  variant="contained"
                  startIcon={<WhatsAppIcon />}
                  className={classes.whatsappBtn}
                  component={Link}
                  to={`/${productDetail.id}/waorder`}
                >
                  Buy Via WhatsApp
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
