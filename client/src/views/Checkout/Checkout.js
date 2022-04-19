import React, { useState, useEffect } from 'react';

import { Helmet } from 'react-helmet';

import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import customAxios from '../../navigation/NavigationService';
import MuiAlert from '@mui/material/Alert';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import Cartpage from '../../components/Checkout/Cartpage';
import AddressForm from '../../components/Checkout/AddressForm';
import PaymentForm from '../../components/Checkout/PaymentForm';
// import Review from '../../components/Checkout/Review';

import { styled } from '@mui/material/styles';
import './Checkout.css';

import {
  useGetAddressesQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
} from '../../features/address/addressApi';

const styledLayout = styled('main')(({ theme }) => ({
  width: 'auto',
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
    width: 600,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const steps = ['Address', 'Review your order', 'Payment'];

const Addresses = (props) => {
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
      <Helmet>
        <title>இராவணன் அங்காடி | Checkout </title>
      </Helmet>
      {props.addresses.length > 0 ? (
        props.addresses.results.map((address) => (
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
        <h4 className="Product_Text"> No Saved Address</h4>
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
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [addressId, setAddressId] = useState('');

  const { data: addresses, isLoading: isGetAddress } = useGetAddressesQuery();
  const [createAddressApi, { isLoading: isCreateAddress, data: createdData }] =
    useCreateAddressMutation();
  const [updateAddress, { isLoading: isUpdateAddress, data: updatedData }] =
    useUpdateAddressMutation();

  //const [addresses, setAddresses] = useState([]);
  const [createAddress, setCreateAddress] = useState(false);
  const [checked, setChecked] = useState([]);
  const cart = useSelector((state) => state.cart);
  const cartItems = cart.cartItems;
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (addresses.results.length > 0) {
      setCreateAddress(false);
    }
  }, [addresses]);

  function getStepContent(step) {
    switch (step) {
      case 0: {
        if (createAddress) {
          console.log('wss');
          const address = {
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

        cartItems.map((prod) =>
          items.push({
            quantity: prod.quantity,
            product: prod.id,
            price: prod.price_id,
            extra: prod.otherinfo,
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

  const handleNext = async () => {
    if (activeStep === 0) {
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
          try {
            await updateAddress({
              phone: mobile.substring(3),
              name: name,
              address1: addressline1,
              address2: addressline2,
              city: city,
              state: state,
              postal: pincode,
              country: 'India',
              id: addressId,
            }).unwrap();
            console.log(updatedData);
            setAddressId(updatedData.id);
          } catch (error) {
            console.log(error);
            setError('Unable to update address');
            setOpen(true);
            return;
          }
        } else {
          try {
            await createAddressApi({
              phone: mobile.substring(3),
              name: name,
              address1: addressline1,
              address2: addressline2,
              city: city,
              state: state,
              postal: pincode,
              country: 'India',
              id: addressId,
            });

            setAddressId(createdData.id);
          } catch (error) {
            console.log(error);
            setError('Unable to update address');
            setOpen(true);
            return;
          }
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

  return (
    <div>
      <styledLayout>
        <Paper
          sx={{
            my: { sm: 6, md: 3 },
            p: { sm: 3, md: 2 },
          }}
        >
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
                    sx={{
                      marginTop: 3,
                      marginLeft: 1,
                    }}
                  >
                    Add New Address
                  </Button>
                )}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
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
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        {/* <Copyright /> */}
      </styledLayout>
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
