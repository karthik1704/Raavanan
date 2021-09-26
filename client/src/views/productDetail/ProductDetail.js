import { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// import StoreIcon from '@mui/icons-material/Store';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { green } from '@mui/material/colors';

import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';
import axios from 'axios';
import { addItem } from '../../data/actions/cartActions';
import { Helmet } from 'react-helmet';

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { API_URL } from '../../CONSTANTS';
import { fetchProductDetail } from '../../data/actions/productActions';

import { styled } from '@mui/material/styles';

const RootDiv = styled('div')(({ theme }) => ({
  margin: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    margin: '16px 0',
  },
}));

export default function ProductDetail() {
  const { id } = useParams();
  const { productDetail } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [images, setImages] = useState([]);
  const [size, setSize] = useState('');
  // const [price, setPrice] = useState('');
  const [type, setType] = useState('');
  const [mrp, setMrp] = useState('');
  const login = useSelector((state) => state.login);
  const loggedIn = login.loggedIn;
  const cart = useSelector((state) => state.cart);
  const cartItems = cart.cartItems;

  const handleAddItemtoCart = (product_id) => {
    dispatch(
      addItem({
        id: productDetail.id,
        price: value.id,
        material: productDetail.material,
      })
    );
  };

  // useEffect(() => {
  //   var carts = []
  //   for(var i=0;i<cartItems.length;i++){
  //     carts.push({
  //       "product" : cartItems[i]['id'],
  //       "price" : cartItems[i]['price_id'],
  //       "quantity": cartItems[i]['quantity']
  //     })
  //   }
  // axios.post(`${API_URL}api/sync_cart/`, carts)
  //   .then((response) => {
  //  console.log(response);
  //   }, (error) => {
  //     console.log(error);

  //   });
  // }, [cartItems]);

  useEffect(() => {
    // fetch(`http://localhost:8000/api/product/${id}`)
    //   .then((res) => res.json())
    //   .then((data) => dispatch(fetchProductDetail(data)))
    //   .catch((err) => console.log(err));

    axios.get(`${API_URL}api/product/${id}`).then((res) => {
      dispatch(fetchProductDetail(res.data));

      if (res.data.price) {
        setValue(res.data.price[0]);
      }
      let localimages = [];
      if (res.data.imageurl) {
        localimages.push({
          original: res.data.imageurl,
          thumbnail: res.data.imageurl,
        });
      }

      if (res.data.image.length > 0) {
        let image = res.data.image.map((img) => ({
          original: img.image,
          thumbnail: img.image,
        }));

        localimages = localimages.concat(image);
      }
      setImages(localimages);
    });

    //return () => dispatch(fetchProductDetail({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // useEffect(() => {
  //   if (productDetail.materials) {
  //     setValue(productDetail.materials[0].material_name);
  //   }
  //   setSize('12*10');
  // }, [productDetail]);

  // useEffect(() => {
  //   console.log("use effect")
  //   if(!productDetail)
  //     return
  //   console.log(productDetail)

  // }, [size]);

  // const handleChange = (e) => {
  //   setValue(e.target.value);
  // };
  const handleSizeChange = (e) => {
    setSize(e.target.value);
    productDetail.price
      .filter((price) => price.types === e.target.value)
      .map((price) => {
        // setMrp(price.mrp);
        // setPrice(price.price);
        setValue(price);
      });
  };

  if (Object.keys(productDetail).length === 0) {
    return <div />;
  }

  // const images1 = [
  //   {
  //     original: 'http://127.0.0.1:8000/media/product/mh_2.jpg',
  //     thumbnail: 'http://127.0.0.1:8000/media/product/mh_2.jpg',
  //     // originalClass  : 'productImage'
  //   },
  //   {
  //     original: 'https://picsum.photos/id/1015/1000/600/',
  //     thumbnail: 'https://picsum.photos/id/1015/250/150/',
  //   },
  //   {
  //     original: 'https://picsum.photos/id/1019/1000/600/',
  //     thumbnail: 'https://picsum.photos/id/1019/250/150/',
  //   },
  // ];

  return (
    <RootDiv>
      <Helmet>
        {`
        <title>
          இராவணன் அங்காடி | {ProductDetail && productDetail.product_name}
        </title>
`}
      </Helmet>
      {productDetail && (
        <div key={productDetail.id}>
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
                {/* <img
                  src={productDetail.imageurl}
                  alt={productDetail.name}
                  className={
                    
                    classes.productImage
                  }
                /> */}
                <ImageGallery
                  items={images}
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
                {productDetail.name}
              </Typography>
              {/* <Typography variant="subtitle1">
                category: {product.category}
              </Typography> */}
              <Divider />
              {/* {productDetail.category &&
                productDetail.category.name !== 'படச்சட்டகம்' && (
                  <>
                    {productDetail.category &&
                    productDetail.category.name === 'கைபேசி உறை' ? (
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
                )} */}

              {/* {productDetail.category &&
                productDetail.category.name === 'படச்சட்டகம்' && ( */}
              <>
                <Typography variant="subtitle1">
                  அதிகபட்ச விற்பனை விலை: ₹ <del>{value.mrp}</del>
                </Typography>
                <Typography variant="subtitle1">
                  தற்போதைய விலை: ₹ <b>{value.price}</b>
                </Typography>
                <Divider />
                <FormControl component="fieldset">
                  {productDetail.price.length > 1 && (
                    <FormLabel component="legend" color="secondary">
                      அளவைத் தேர்ந்தெடுக்கவும் (அங்குலங்களில்)
                    </FormLabel>
                  )}

                  <RadioGroup
                    row
                    aria-label="position"
                    name="position"
                    defaultValue={productDetail.price[0].types}
                    onChange={handleSizeChange}
                  >
                    {productDetail.price
                      .filter((price) => price.types !== null)
                      .map((price) => (
                        <FormControlLabel
                          value={price.types}
                          control={<Radio color="primary" />}
                          label={price.types}
                          labelPlacement="end"
                        />
                      ))}
                  </RadioGroup>
                </FormControl>
              </>
              {/* )} */}

              <div>
                <Typography variant="body1">இருப்பில் உள்ளது</Typography>
                <Button
                  sx={{
                    m: 1,
                    backgroundColor: green[500],
                  }}
                  color="secondary"
                  justifycontent="flex-end"
                  variant="contained"
                  startIcon={<AddShoppingCartIcon />}
                  onClick={(event) => {
                    handleAddItemtoCart(productDetail.id);
                  }}
                >
                  கூடை
                </Button>
                {/* <Button
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
                </Button> */}

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
                      {productDetail.category && productDetail.category.name}
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
    </RootDiv>
  );
}

//export default ProductDetail;
