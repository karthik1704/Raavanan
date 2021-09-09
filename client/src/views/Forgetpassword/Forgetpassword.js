import React, { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';

//import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import MuiPhoneInput from 'material-ui-phone-number';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import Container from '@mui/material/Container';
import Header from '../../components/Header/Header';
import { API_URL } from '../../CONSTANTS';

import { styled } from '@mui/material/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Div = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: '#43a047',
//   },
//   form: {
//     width: '100%', // Fix IE 11 issue.
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//     float: 'right',
//   },
//   padding_bottom: {
//     paddingBottom: 10,
//   },
// }));

export default function Forgetpassword() {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [mobileerror, setMobileerror] = useState(false);
  const [passworderror, setPassworderror] = useState(false);
  const [confirmpassworderror, setConfirmpassworderror] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [otperror, setOtperror] = useState(false);
  const [otperrortext, setOtperrortext] = useState('');

  const otp_url = `${API_URL}api/auth/password/reset/phone/`;
  const otp_verify_url = `${API_URL}api/auth/password/reset/phone/verify/`;

  const handleMobileChange = (event) => {
    setMobile(event);

    if (mobile.length !== 12) setMobileerror(true);
    else setMobileerror(false);
  };
  const handlePasswordChange = (event) => {
    const password = event.target.value;
    setPassword(password);
    if (password.length > 0 && password.length < 8) setPassworderror(true);
    else setPassworderror(false);
    if (confirmpassword.length >= 8) {
      if (password === confirmpassword) {
        setConfirmpassworderror(false);
      } else setConfirmpassworderror(true);
    }
  };
  const handleConfirmpasswordChange = (event) => {
    const confirmpassword = event.target.value;
    setConfirmpassword(confirmpassword);
    if (confirmpassword.length > 0) {
      if (
        confirmpassword.length < 8 ||
        (confirmpassword.length >= 8 && password != confirmpassword)
      )
        setConfirmpassworderror(true);
      else setConfirmpassworderror(false);
    } else setConfirmpassworderror(false);
  };
  const handleOtpChange = (event) => {
    const otp = event.target.value;
    if (isNaN(otp)) {
      return;
    }
    setOtp(otp);

    if (otp.length < 6) {
      setOtperrortext('Please enter 6 digits');
      setOtperror(true);
    } else {
      setOtperrortext('');
      setOtperror(false);
    }
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const getOtp = (e) => {
    if (mobile.length !== 13) return;
    if (!isOtpSent) {
      axios
        .post(otp_url, {
          phone: mobile.substring(3),
        })
        .then(
          (response) => {
            // dispatch(loginUser(response));
            setIsOtpSent(true);
          },
          (error) => {
            console.log(error);
            setError('Unable to send OTP, Please try after some time');
            setOpen(true);
          }
        );
    }
  };

  const handleSubmit = (e) => {
    if (passworderror || confirmpassworderror || mobile.length !== 13) return;
    if (!isOtpSent) {
      axios
        .post(otp_url, {
          mobile: mobile.substring(3),
        })
        .then(
          (response) => {
            // dispatch(loginUser(response));
            setIsOtpSent(true);
          },
          (error) => {
            console.log(error);
            setError('Unable to send OTP, Please try after some time');
            setOpen(true);
          }
        );
    } else {
      if (otp.length < 6) {
        setError('Please Enter valid OTP');
        setOpen(true);
        return;
      }
      axios
        .post(otp_verify_url, {
          mobile: mobile.substring(3),
          otp: otp,
        })
        .then(
          (response) => {
            //registeruser();
            setIsOtpSent(false);
            setOtp('');
          },
          (error) => {
            setError(error.response.data['non_field_errors'][0]);
            setOpen(true);
          }
        );
    }
  };

  return (
    <>
      <Header title="Create Account" subtitle="Home" />

      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Div>
          <Avatar
            sx={{
              margin: 1,
              backgroundColor: '#43a047',
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            sx={{
              paddingBottom: 10,
            }}
          >
            Reset your password
          </Typography>
          <Typography component="p" variant="p">
            We will send you an otp to your phone to reset your password.
          </Typography>
          <ValidatorForm
            // ref="form"
            style={{ width: '100%' }}
            onSubmit={handleSubmit}
            onError={(errors) => console.log(errors)}
          >
            {/* <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            className="Register_text"
          /> */}
            {/* <TextValidator
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={handleEmailChange}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"            
            className="Register_text"
            value={email}
            validators={['required', 'isEmail']}
            errorMessages={['this field is required', 'email is not valid']}
          /> */}
            {!isOtpSent && (
              <>
                <MuiPhoneInput
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="phone"
                  label="Phone"
                  name="phone"
                  autoFocus
                  className="Register_text"
                  defaultCountry="in"
                  onlyCountries={['in']}
                  autoFormat={false}
                  inputProps={{
                    maxLength: 13,
                    autoComplete: 'false',
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
                <Button
                  onClick={getOtp}
                  align="right"
                  variant="contained"
                  color="primary"
                  sx={{
                    margin: (theme) => theme.spacing(3, 0, 2),
                    float: 'right',
                  }}
                >
                  GET OTP
                </Button>
              </>
            )}
            {isOtpSent && (
              <>
                <TextValidator
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  inputProps={{
                    maxLength: 20,
                    autoComplete: 'false',
                  }}
                  onChange={handlePasswordChange}
                  value={password}
                  validators={['required']}
                  errorMessages={['Password is required']}
                  helperText={`${
                    password.length < 8 && password.length > 0
                      ? 'Password should be minimum 8 characters'
                      : ''
                  }`}
                  error={passworderror}
                />
                <TextValidator
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="confirm_password"
                  label="Confirm Password"
                  type="password"
                  id="confirm_password"
                  inputProps={{
                    maxLength: 20,
                    autoComplete: 'false',
                  }}
                  onChange={handleConfirmpasswordChange}
                  value={confirmpassword}
                  validators={['required']}
                  errorMessages={['Confirm password is required']}
                  helperText={`${
                    confirmpassword.length < 8 && confirmpassword.length > 0
                      ? 'Password should be minimum 8 characters'
                      : confirmpassword.length > 0 &&
                        confirmpassword !== password
                      ? 'Passwords does not match'
                      : ''
                  }`}
                  error={confirmpassworderror}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{
                    margin: (theme) => theme.spacing(3, 0, 2),
                    float: 'right',
                  }}
                >
                  Submit
                </Button>
              </>
            )}

            {/*           
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
          Submit
          </Button> */}
          </ValidatorForm>
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
        </Div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
