/* eslint-disable react/jsx-one-expression-per-line */
import { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
// import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

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
  const [value, setValue] = useState('');
  const [size, setSize] = useState('');
  const [price, setPrice] = useState('');
  const [mrp, setMrp] = useState('');

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

  useEffect(() => {
    if (productDetail.materials) {
      setValue(productDetail.materials[0].material_name);
    }
    setSize('12*10');
  }, [productDetail]);

  useEffect(() => {
    if (size === '12*10' || size === '') {
      setMrp(649);
      setPrice(499);
    } else if (size === '10*15') {
      setMrp(799);
      setPrice(599);
    } else if (size === '12*18') {
      setMrp(1099);
      setPrice(799);
    } else if (size === '20*16') {
      setMrp(1399);
      setPrice(999);
    } else if (size === '20*30') {
      setMrp(2499);
      setPrice(1999);
    } else if (size === '24*36') {
      setMrp(3000);
      setPrice(2499);
    }
  }, [size]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

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
          <Grid container spacing={10}>
            <Grid item xs={12} md={6} lg={5} className={classes.center}>
              <div>
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
                    {productDetail.category &&
                    productDetail.category.category_name === 'கைபேசி உறை' ? (
                      <>
                        <Typography variant="subtitle1">
                          அதிகபட்ச விற்பனை விலை: ₹{' '}
                          <del>
                            {value === 'குழைமம் ( பிளாஸ்டிக் )'
                              ? productDetail.mrp
                              : productDetail.mrp + 50}
                          </del>
                        </Typography>
                        <Typography variant="subtitle1">
                          தற்போதைய விலை: ₹{' '}
                          <b>
                            {value === 'குழைமம் ( பிளாஸ்டிக் )'
                              ? productDetail.price
                              : productDetail.price + 50}
                          </b>
                        </Typography>
                        <Divider />
                        <FormControl component="fieldset">
                          <FormLabel component="legend" color="secondary">
                            மூலப்பொருளைத் தேர்ந்தெடுக்கவும்
                          </FormLabel>
                          <RadioGroup
                            row
                            aria-label="position"
                            name="position"
                            defaultValue={
                              productDetail.materials &&
                              productDetail.materials[0].material_name
                            }
                            onChange={handleChange}
                          >
                            {productDetail.materials &&
                              productDetail.materials.map((material) => (
                                <FormControlLabel
                                  key={material.id}
                                  value={material.material_name}
                                  control={<Radio color="primary" />}
                                  label={material.material_name}
                                  labelPlacement="end"
                                />
                              ))}
                          </RadioGroup>
                        </FormControl>
                      </>
                    ) : (
                      <>
                        <Typography variant="subtitle1">
                          அதிகபட்ச விற்பனை விலை: ₹{' '}
                          <del>{productDetail.mrp}</del>
                        </Typography>
                        <Typography variant="subtitle1">
                          தற்போதைய விலை: ₹ <b>{productDetail.price}</b>
                        </Typography>
                        <Divider />
                      </>
                    )}
                  </>
                )}

              {productDetail.category &&
                productDetail.category.category_name === 'படச்சட்டகம்' && (
                  <>
                    <Typography variant="subtitle1">
                      அதிகபட்ச விற்பனை விலை: ₹ <del>{mrp}</del>
                    </Typography>
                    <Typography variant="subtitle1">
                      தற்போதைய விலை: ₹ <b>{price}</b>
                    </Typography>
                    <Divider />
                    <FormControl component="fieldset">
                      <FormLabel component="legend" color="secondary">
                        அளவைத் தேர்ந்தெடுக்கவும் (அங்குலங்களில்)
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-label="position"
                        name="position"
                        defaultValue="12*10"
                        onChange={handleSizeChange}
                      >
                        <FormControlLabel
                          value="12*10"
                          control={<Radio color="primary" />}
                          label="12*10"
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          value="10*15"
                          control={<Radio color="primary" />}
                          label="10*15"
                          labelPlacement="end"
                        />

                        <FormControlLabel
                          value="12*18"
                          control={<Radio color="primary" />}
                          label="12*18"
                          labelPlacement="end"
                        />

                        <FormControlLabel
                          value="20*16"
                          control={<Radio color="primary" />}
                          label="20*16"
                          labelPlacement="end"
                        />

                        <FormControlLabel
                          value="20*30"
                          control={<Radio color="primary" />}
                          label="20*30"
                          labelPlacement="end"
                        />

                        <FormControlLabel
                          value="24*36"
                          control={<Radio color="primary" />}
                          label="24*36"
                          labelPlacement="end"
                        />
                      </RadioGroup>
                    </FormControl>
                  </>
                )}

              <div>
                <Typography variant="body1">இருப்பில் உள்ளது</Typography>
                <Button
                  variant="contained"
                  startIcon={<WhatsAppIcon />}
                  className={classes.whatsappBtn}
                  component={Link}
                  to={{
                    pathname: `/${productDetail.id}/waorder`,
                    state: {
                      material: value,
                      size,
                      price,
                    },
                  }}
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
