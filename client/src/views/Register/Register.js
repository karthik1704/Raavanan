/* eslint-disable no-unreachable */
import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import MuiPhoneInput from 'material-ui-phone-number';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { API_URL } from '../../CONSTANTS';
import Header from '../../components/Header/Header';
import { loginUser } from '../../data/actions/loginActions';

import { styled } from '@mui/material/styles';
import './Register.css';

const RootDiv = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
//   },
// }));

// useEffect(() => {
//   axios.get(category === 'new' ? url : filterUrl).then((res) => {
//     return dispatch(fetchProduct(res.data.results));
//   });
// }, [dispatch, category, url, filterUrl]);

// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const schema = yup.object().shape({
  first_name: yup.string().required('First name required*'),
  last_name: yup.string().required('Last name required*'),
  phone: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Please enter Phonenumber'),

  email: yup
    .string()
    .required('Email address required*')
    .email('Please enter vaild e-mail'),
  password1: yup
    .string()
    .trim('Should be startwith letters or numbers')
    .required('Password required*')
    .min(8, 'Password must be at least 8 characters'),
  password2: yup
    .string()
    .trim('Should be startwith letters or numbers')
    .oneOf([yup.ref('password1'), null], 'Passwords must match')
    .required('Confrim password required*')
    .min(8, 'Confrim password must be at least 8 characters'),
  terms: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('You must accept the terms and conditions'),
});

export default function Register() {
  const { handleSubmit, control, getValues } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerfied, setIsOtpVerified] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [otperror, setOtperror] = useState(false);
  const [otperrortext, setOtperrortext] = useState('');
  //const [isOtpResent, setIsOtpResent] = useState(false);

  const registration_url = `${API_URL}api/auth/registration/`;
  const otp_url = `${API_URL}api/auth/phone/verify/otp/`;
  const otp_verify_url = `${API_URL}api/auth/phone/verify/otp/confirm/`;
  const otp_resend_url = `${API_URL}api/auth/phone/resend/`;

  const handleRegisterSubmit = (data) => {
    if (data.phone.length !== 13) return;
    registeruser(data);
    return; // remove this return for otp logic

    // Future Purpose -- start of unreachable code
    if (!isOtpSent) {
      axios
        .post(otp_url, {
          mobile: data.phone.substring(3),
        })
        .then(
          (response) => {
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
          mobile: data.phone.substring(3),
          otp: otp,
        })
        .then(
          (response) => {
            registeruser();
            setIsOtpSent(false);
            setOtp('');
          },
          (error) => {
            setError(error.response.data['non_field_errors'][0]);
            setOpen(true);
          }
        );
    }
    // end of unreachable code
  };

  const registeruser = ({
    email,
    phone,
    first_name,
    last_name,
    password1,
    password2,
  }) => {
    axios
      .post(registration_url, {
        email,
        phone: phone.substring(3),
        first_name,
        last_name,
        password1,
        password2,
        birth_year: '',
        country: '',
      })
      .then((response) => {
        // console.log(response);
        dispatch(loginUser(response.data));
      })
      .catch((err) => {
        // for (let i in err.response.data) {
        //   setError(error.response.data[i]);
        //   setOpen(true);
        //   break;
        // }
        console.log(err);
      });
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

  const handleResend = () => {
    console.log(getValues('phone'));
    axios
      .post(otp_resend_url, {
        mobile: getValues('phone').substring(3),
      })
      .then(
        (response) => {
          // dispatch(loginUser(response));
          setIsOtpSent(true);
        },
        (error) => {
          //console.log(error);
          setError('Unable to send OTP, Please try after some time');
          setOpen(true);
        }
      );
    //
  };

  return (
    <>
      <Header title="Create Account" subtitle="Home" />

      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <RootDiv>
          <Avatar
            sx={{
              margin: 1,
              backgroundColor: '#43a047',
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit(handleRegisterSubmit)}>
            <Controller
              name="phone"
              defaultValue=""
              control={control}
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
                  //disableCountryCode = {true}
                  //disableDropdown = {true}
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

            <Controller
              name="email"
              defaultValue=""
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Email Address"
                  autoComplete="email"
                  className="Register_text"
                  error={error && true}
                  helperText={error && error.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="first_name"
              defaultValue=""
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="First Name"
                  type="text"
                  inputProps={{
                    maxLength: 20,
                  }}
                  autoComplete="first_name"
                  error={error && true}
                  helperText={error && error.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="last_name"
              defaultValue=""
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Last Name"
                  type="text"
                  inputProps={{
                    maxLength: 20,
                  }}
                  autoComplete="first_name"
                  error={error && true}
                  helperText={error && error.message}
                  {...field}
                />
              )}
            />

            <Controller
              name="password1"
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
                  error={error && true}
                  {...field}
                />
              )}
            />
            <Controller
              name="password2"
              defaultValue=""
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  inputProps={{
                    maxLength: 20,
                    autoComplete: 'false',
                  }}
                  helperText={error && error.message}
                  error={error && true}
                  {...field}
                />
              )}
            />

            {isOtpSent && (
              <TextField
                variant="outlined"
                margin="normal"
                inputProps={{
                  maxLength: 6,
                }}
                name="OTP"
                label="OTP"
                type="text"
                id="otp"
                onChange={handleOtpChange}
                helperText={otperrortext}
                error={otperror}
                value={otp}
              />
            )}
            {isOtpSent && (
              <Button
                onClick={handleResend}
                variant="contained"
                color="primary"
                sx={{
                  margin: (theme) => theme.spacing(3, 0, 2),
                }}
              >
                Resend OTP
              </Button>
            )}
            <br></br>
            {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label={
              <div>
                 <span>I accept the </span>
                 <Link to={'/terms'}>terms of use</Link>
                 <span> and </span>
                 <Link to={'/privacy'}>privacy policy</Link>
              </div>
              }
          /> */}

            <Controller
              name="terms"
              defaultValue={false}
              control={control}
              render={({
                field: { onChange, value, ref, ...rest },
                fieldState: { error },
              }) => (
                <FormControl error={error && true} variant="standard">
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={value}
                          onChange={(e) => onChange(e.target.checked)}
                          color="secondary"
                          {...rest}
                        />
                      }
                      label={
                        <>
                          I accept the{' '}
                          <Link
                            underline="hover"
                            style={{ pointerEvents: 'auto' }}
                            component={RouterLink}
                            to="/terms"
                          >
                            terms of use &#38; privacy poilicy
                          </Link>
                        </>
                      }
                    />
                    {error?.message && (
                      <FormHelperText>{error?.message}</FormHelperText>
                    )}
                  </FormGroup>
                </FormControl>
              )}
            />

            {/* {
            !isOtpSent && (
              <Button
          type = 'submit'        
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled = {!checkValue}            
          >
            GET OTP
          </Button>
            )
          } */}
            {!isOtpSent && (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  margin: (theme) => theme.spacing(3, 0, 2),
                }}
              >
                Submit
              </Button>
            )}

            <Grid
              container
              sx={{
                justifyContent: 'end',
              }}
            >
              <Grid item>
                <Link
                  component={RouterLink}
                  to="/login"
                  underline="hover"
                  color="textPrimary"
                  variant="body2"
                >
                  {'Do you have an account? Sign in'}
                </Link>
              </Grid>
            </Grid>
            {/* </form> */}
          </Box>
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
        </RootDiv>
      </Container>
    </>
  );
}
