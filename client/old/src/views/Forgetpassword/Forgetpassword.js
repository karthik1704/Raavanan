import React, { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

//import { useSelector, useDispatch } from 'react-redux';
import customAxios from '../../navigation/NavigationService';
import MuiPhoneInput from 'material-ui-phone-number';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import Header from '../../components/Header/Header';
import { API_URL } from '../../CONSTANTS';

import { styled } from '@mui/material/styles';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
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

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const phoneRestOTPSchema = yup.object().shape({
  phone: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Please enter Phonenumber'),
});

const verfiyOTPSchema = yup.object().shape({
  otp: yup
    .number()
    .max(6, 'OTP is six digit code')
    .required('Please enter OTP'),
});

const passwoedResetSchema = yup.object().shape({
  new_password1: yup
    .string()
    .trim('Should be startwith letters or numbers')
    .required('Password required*')
    .min(8, 'Password must be at least 8 characters'),
  new_password2: yup
    .string()
    .trim('Should be startwith letters or numbers')
    .oneOf([yup.ref('password1'), null], 'Passwords must match')
    .required('Confrim password required*'),
});

export default function Forgetpassword() {
  const { handleSubmit: handleOTPSubmit, control: OTPFormControl } = useForm({
    resolver: yupResolver(phoneRestOTPSchema),
  });

  const {
    handleSubmit: handleOTPVerfifySubmit,
    control: OTPVerfiyControl,
  } = useForm({
    resolver: yupResolver(phoneRestOTPSchema),
  });

  const { handleSubmit, control } = useForm({
    resolver: yupResolver(passwoedResetSchema),
  });

  const [mobile, setMobile] = useState('');
  const [uid, setUid] = useState('');
  const [token, setToken] = useState('');

  const [mobileerror, setMobileerror] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [otperror, setOtperror] = useState(false);
  const [otperrortext, setOtperrortext] = useState('');

  const otp_url = `${API_URL}auth/password/reset/phone/`;
  const otp_verify_url = `${API_URL}auth/password/reset/phone/verify/`;
  const passwordResetConfrimUrl = `${API_URL}auth/password/reset/confirm/`;

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

  const getOtp = () => {
    if (mobile.length !== 13) return;
    if (!isOtpSent) {
      customAxios
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

  const handleSendOTPSubmit = ({ phone }) => {
    if (phone.length !== 13) return;
    if (!isOtpSent) {
      customAxios
        .post(otp_url, {
          mobile: phone.substring(3),
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
      customAxios
        .post(otp_verify_url, {
          mobile: mobile.substring(3),
          otp: otp,
        })
        .then(
          (res) => {
            setIsOtpSent(false);
            setUid(res.data.uid);
            setToken(res.data.token);
            setOtp('');
          },
          (error) => {
            setError(error.response.data['non_field_errors'][0]);
            setOpen(true);
          }
        );
    }
  };

  const handleResetPassword = ({ new_password1, new_password2 }) => {
    customAxios
      .post(passwordResetConfrimUrl, {
        uid,
        token,
        new_password1,
        new_password2,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
            {!isOtpSent &&
              'We will send you an otp to your phone to reset your password.'}
          </Typography>
          {!isOtpSent && (
            <Box
              component="form"
              sx={{ width: '100%' }}
              onSubmit={handleOTPSubmit(handleSendOTPSubmit)}
            >
              <Controller
                name="phone"
                defaultValue=""
                control={OTPFormControl}
                render={({ field, fieldState: { error } }) => (
                  <MuiPhoneInput
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Phone"
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
                    helperText={error && error.message}
                    error={error && true}
                    {...field}
                  />
                )}
              />

              <Button
                type="submit"
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
            </Box>
          )}
          {isOtpSent && (
            <Box component="form" onSubmit={handleOTPVerfifySubmit}>
              <Controller
                name="otp"
                defaultValue=""
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="number"
                    inputProps={{
                      maxLength: 6,
                      autoComplete: 'false',
                    }}
                    helperText={error && error.message}
                    error={error}
                    {...field}
                  />
                )}
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
            </Box>
          )}

          {
            <Box component="form" onSubmit={handleSubmit(handleResetPassword)}>
              <Controller
                name="new_password1"
                defaultValue=""
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="password"
                    inputProps={{
                      maxLength: 20,
                      autoComplete: 'false',
                    }}
                    helperText={error && error.message}
                    error={error}
                    {...field}
                  />
                )}
              />

              <Controller
                name="new_password2"
                defaultValue=""
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="password"
                    inputProps={{
                      maxLength: 20,
                      autoComplete: 'false',
                    }}
                    helperText={error && error.message}
                    error={error}
                    {...field}
                  />
                )}
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
            </Box>
          }

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
