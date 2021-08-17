import { useState, useEffect } from 'react';
import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import MuiAlert from '@material-ui/core/Alert';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useSelector, useDispatch } from 'react-redux';
import makeStyles from '@material-ui/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import Cartpage from '../../components/Checkout/Cartpage';
import AddressForm from '../../components/Checkout/AddressForm';
import PaymentForm from '../../components/Checkout/PaymentForm';
// import Review from '../../components/Checkout/Review';
import './Checkout.css';

import { API_URL } from '../../CONSTANTS';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      margin: '16px 0',
    },
  },
  card: {
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
    // [theme.breakpoints.up('md')]: {
    //   flexDirection: 'row',
    // },
  },
  header: {
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
    },
  },
  center: {
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  image: {
    height: 115,
    width: 60,
    [theme.breakpoints.down('md')]: {
      width: 50,
    },
  },
  grow: {
    flex: 1,
  },
  margin: {
    margin: theme.spacing(1),
  },
  orderForm: {
    display: 'flex',
    flexDirection: 'column',

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
      [theme.breakpoints.down('md')]: {
        width: 'auto',
      },
    },
  },
  nameForm: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  btnSize: {
    width: '40%',
    [theme.breakpoints.down('md')]: {
      width: 'auto',
    },
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Address', 'Review your order', 'Payment'];

const Addresses = (props) => {
  console.log(props);

  // props.addresses.map((address) => {
  //   // obj[address.id] = false
  //   address['checked'] = false;

  // })

  console.log(props.addresses);

  const checked = props.checked;
  const setChecked = props.setChecked;
  // console.log('state')
  // console.log(state1);

  const handleCheck = (event) => {
    const value = event.target.name;

    setChecked(
      checked.includes(value) ? checked.filter((c) => c !== value) : [value]
    );
  };

  // const handleChange1 = (event) => {};

  return (
    <>
      {props.addresses.length > 0 ? (
        props.addresses.map((address) => (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-label="Expand"
              aria-controls="additional-actions2-content"
              id="additional-actions2-header"
            >
              <FormControlLabel
                aria-label="Acknowledge"
                onClick={(event) => event.stopPropagation()}
                onFocus={(event) => event.stopPropagation()}
                control={
                  <Checkbox
                    onChange={(e) => handleCheck(e)}
                    checked={checked.includes(String(address.id))}
                    name={address.id}
                  />
                }
                label={address.name}
              />
            </AccordionSummary>
            <AccordionDetails>
              {/* <Typography color="textSecondary"> */}
              <Grid item xs={12} sm={6}>
                <Typography color="textSecondary">{address.name}</Typography>
                <Typography color="textSecondary">
                  {address.address1}, {address.address2},
                </Typography>
                <Typography color="textSecondary">
                  {address.city},{address.state}
                </Typography>
                <Typography color="textSecondary">{address.postal}</Typography>
                {/* </Typography> */}
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <h4 class="Product_Text"> No Saved Address</h4>
      )}
    </>
  );
};

const Checkout = () => {
  const [mobile, setMobile] = useState('');
  const [name, setName] = useState('');
  const [addressline1, setAddressline1] = useState('');
  const [addressline2, setAddressline2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [mobileerror, setMobileerror] = useState(false);
  // const [message, setMessage] = useState({});
  // const [product, setProduct] = useState({});
  // const [quantity, setQuantity] = useState(1);
  // const [price, setPrice] = useState(0);
  // const { id } = useParams();
  // const { state } = useLocation();
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [addressId, setAddressId] = useState('');
  const address_create_url = `${API_URL}api/address/`;

  const [addresses, setAddresses] = useState([]);
  const [createAddress, setCreateAddress] = useState(false);
  const [checked, setChecked] = useState([]);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const cartItems = cart.cartItems;
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    axios.get(address_create_url).then((res) => {
      // return dispatch(fetchProduct(res.data.results));
      setAddresses(res.data.results);
      console.log(res);
      if (res.data.results.length > 0) {
        setCreateAddress(false);
      }
      //setAddressId(res.data.results[0].id)
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  function getStepContent(step) {
    switch (step) {
      case 0: {
        if (createAddress) {
          console.log('wss');
          var address = {
            mobile: mobile,
            setMobile: setMobile,
            mobileerror: mobileerror,
            setMobileerror: setMobileerror,
            name: name,
            setName: setName,
            addressline1: addressline1,
            setAddressline1: setAddressline1,
            addressline2: addressline2,
            setAddressline2: setAddressline2,
            city: city,
            setCity: setCity,
            state: state,
            setState: setState,
            pincode: pincode,
            setPincode: setPincode,
          };
          return <AddressForm address={address} />;
        }
        return (
          <Addresses
            addresses={addresses}
            checked={checked}
            setChecked={setChecked}
          />
        );
      }

      //

      case 1:
        return <Cartpage />;
      case 2:
        var items = [];
        console.log(cartItems);
        cartItems.map((prod) =>
          items.push({
            quantity: prod.quantity,
            product: prod.id,
            price: prod.price_id,
          })
        );
        var order = {
          address: addressId,
          total_price: 1000,
          payment_id: '',
          extra: '',
          order_status: 'Processing',
          transaction_status: 'Waiting',
          items: items,
        };

        return <PaymentForm order={order} />;
      default:
        console.log(activeStep);
        throw new Error('Unknown step');
      // return <Review />;
    }
  }

  const handleNext = () => {
    if (activeStep === 0) {
      console.log(checked);
      if (!createAddress) {
        if (checked.length < 1) {
          setError('Please select one address');
          setOpen(true);
          return;
        } else {
          setAddressId(checked[0]);
        }
      } else {
        if (
          name.length === 0 ||
          mobile.length !== 13 ||
          addressline1.length === 0 ||
          city.length === 0 ||
          state.length === 0 ||
          pincode.length === 0
        ) {
          setError('Please fill all the mandatory values');
          setOpen(true);
          return;
        }

        console.log(addressId);
        if (addressId) {
          axios
            .put(`${address_create_url}${addressId}/`, {
              phone: mobile.substring(3),
              name: name,
              address1: addressline1,
              address2: addressline2,
              city: city,
              state: state,
              postal: pincode,
              country: 'India',
              id: addressId,
            })
            .then(
              (response) => {
                //dispatch(loginUser(response.data));
                console.log(response);
                setAddressId(response.data.id);
              },
              (error) => {
                console.log(error);
                setError('Unable to update address');
                setOpen(true);
                return;
              }
            );
        } else {
          axios
            .post(address_create_url, {
              phone: mobile.substring(3),
              name: name,
              address1: addressline1,
              address2: addressline2,
              city: city,
              state: state,
              postal: pincode,
              country: 'India',
              id: addressId,
            })
            .then(
              (response) => {
                //dispatch(loginUser(response.data));
                console.log(response);
                setAddressId(response.data.id);
              },
              (error) => {
                console.log(error);
                setError('Unable to update address');
                setOpen(true);
                return;
              }
            );
        }
      }
    }
    if (activeStep !== 2) setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    if (createAddress) {
      setCreateAddress(false);
      return;
    }
    setActiveStep(activeStep - 1);
  };
  // useEffect(() => {
  //   axois
  //     .get(`${API_URL}api/product/${id}`)
  //     .then((res) => setProduct(res.data));
  // }, [id]);

  return (
    <div>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper
            activeStep={activeStep}
            sx={{
              padding: (theme) => theme.spacing(3, 0, 5),
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}

                {activeStep === 0 && !createAddress && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setCreateAddress(true)}
                    className={classes.button}
                  >
                    Add New Address
                  </Button>
                )}
                <div className={classes.buttons}>
                  {activeStep !== 0 ||
                    (createAddress && (
                      <Button
                        onClick={handleBack}
                        sx={{
                          marginTop: 3,
                          marginLeft: 1,
                        }}
                      >
                        Back
                      </Button>
                    ))}
                  {activeStep !== steps.length - 1 && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      sx={{
                        marginTop: 3,
                        marginLeft: 1,
                      }}
                    >
                      {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                    </Button>
                  )}
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        {/* <Copyright /> */}
      </main>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={handleClose}
      >
        <Alert severity="error" onClose={handleClose}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Checkout;
