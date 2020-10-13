/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect } from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import StoreIcon from '@material-ui/icons/Store';

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchProductDetail } from '../../data/actions/productActions';

import useStyles from './styles';

const ProductDetail = () => {
  const { id } = useParams();
  const { productDetail } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchProductDetail(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div>
      {productDetail.map((product) => (
        <div key={product.id}>
          <Grid container>
            <Grid item xs={12} md={6} lg={5}>
              <div>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className={classes.productImage}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h3">{product.name}</Typography>
              <Typography variant="subtitle1">
                category: {product.category}
              </Typography>
              <Divider />
              <Typography variant="subtitle1">
                M.R.P.: ₹ {product.mrp}
              </Typography>
              <Typography variant="subtitle1">
                Price: ₹ <b>{product.price}</b>
              </Typography>
              <Divider />
              <div>
                <Typography variant="body1">In stock</Typography>
                <div className={classes.buttons}>
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
                </div>
              </div>
              <Divider />
              <Typography variant="h6">Product Details</Typography>
              <Table size="small" aria-label="Product Detail table">
                <TableHead>
                  <TableRow>
                    <TableCell>Product By</TableCell>
                    <TableCell>Raavanan</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Brand</TableCell>

                    <TableCell>Raavanan</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Supported Mobile</TableCell>
                    <TableCell>All Mobiles</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Count </TableCell>

                    <TableCell>1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Component </TableCell>
                    <TableCell>Plastic</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Category </TableCell>
                    <TableCell>Phone Case</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Origin </TableCell>
                    <TableCell>Tamil Nadu</TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </Grid>
          </Grid>
        </div>
      ))}
    </div>
  );
};

export default ProductDetail;
