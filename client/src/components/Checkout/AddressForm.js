import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MuiPhoneInput from 'material-ui-phone-number';

export default function AddressForm(props) {
  const mobile = props.address.mobile;
  const setMobile = props.address.setMobile;
  const name = props.address.name;
  const setName = props.address.setName;
  const addressline1 = props.address.addressline1;
  const setAddressline1 = props.address.setAddressline1;
  const addressline2 = props.address.addressline2;
  const setAddressline2 = props.address.setAddressline2;
  const city = props.address.city;
  const setCity = props.address.setCity;
  const state = props.address.state;
  const setState = props.address.setState;
  const pincode = props.address.pincode;
  const setPincode = props.address.setPincode;

  let mobileerror = props.address.mobileerror;
  let setMobileerror = props.address.setMobileerror;

  const handleMobileChange = (event) => {
    setMobile(event);
    if (mobile.length !== 12) setMobileerror(true);
    else setMobileerror(false);
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="name"
            autoFocus
            name="name"
            label="Name"
            fullWidth
            value={name}
            inputProps={{
              maxlength: 30,
            }}
            onChange={(e) => setName(e.target.value)}
            className="Register_text"
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* <TextField
            required
            id="mobile"
            name="mobile"
            label="Mobile"
            fullWidth
            autoComplete="mobile"
          /> */}
          <MuiPhoneInput
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone"
            name="phone"
            autoComplete="phone"
            className="Register_text"
            defaultCountry="in"
            onlyCountries={['in']}
            autoFormat={false}
            inputProps={{
              maxlength: 13,
              autocomplete: false,
            }}
            countryCodeEditable={false}
            onChange={handleMobileChange}
            value={mobile}
            helperText={`${
              mobile.length < 13 && mobile.length > 3
                ? 'Invalid phone number'
                : ''
            }`}
            error={mobileerror}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            inputProps={{
              maxlength: 30,
            }}
            value={addressline1}
            onChange={(e) => setAddressline1(e.target.value)}
            autoComplete="shipping address-line1"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            inputProps={{
              maxlength: 30,
            }}
            value={addressline2}
            onChange={(e) => setAddressline2(e.target.value)}
            autoComplete="shipping address-line2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            value={city}
            inputProps={{
              maxlength: 30,
            }}
            onChange={(e) => setCity(e.target.value)}
            autoComplete="shipping address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            value={state}
            onChange={(e) => setState(e.target.value)}
            inputProps={{
              maxlength: 30,
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            value={pincode}
            inputProps={{
              maxlength: 6,
            }}
            onChange={(e) => setPincode(e.target.value)}
            autoComplete="shipping postal-code"
          />
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
          />
        </Grid> */}
        {/* <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid> */}
      </Grid>
    </>
  );
}
