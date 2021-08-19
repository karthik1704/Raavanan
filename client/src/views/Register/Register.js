import { useState } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/core/Alert';
import Typography from '@material-ui/core/Typography';

import MuiPhoneInput from 'material-ui-phone-number';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { API_URL } from '../../CONSTANTS';
import Header from '../../components/Header/Header';
import { loginUser } from '../../data/actions/loginActions';

import { styled } from '@material-ui/core/styles';
import './Register.css';

const RootDiv = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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

export default function Register() {
  const dispatch = useDispatch();
  // let history = useHistory();
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [mobileerror, setMobileerror] = useState(false);
  const [passworderror, setPassworderror] = useState(false);
  const [confirmpassworderror, setConfirmpassworderror] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerfied, setIsOtpVerified] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [otperror, setOtperror] = useState(false);
  const [otperrortext, setOtperrortext] = useState('');
  const [checkValue, setCheckValue] = useState(false);
  //const [isOtpResent, setIsOtpResent] = useState(false);

  const registration_url = `${API_URL}api/auth/registration/`;
  const otp_url = `${API_URL}api/auth/phone/verify/otp/`;
  const otp_verify_url = `${API_URL}api/auth/phone/verify/otp/confirm/`;
  const otp_resend_url = `${API_URL}api/auth/phone/resend/`;

  const handleSubmit = (e) => {
    if (passworderror || confirmpassworderror || mobile.length !== 13) return;
    registeruser();
    return; // remove this return for otp logic

    if (!isOtpSent) {
      axios
        .post(otp_url, {
          mobile: mobile.substring(3),
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
          mobile: mobile.substring(3),
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
  };

  const registeruser = () => {
    axios
      .post(registration_url, {
        email: email,
        phone: mobile.substring(3),
        first_name: firstname,
        last_name: lastname,
        password1: password,
        password2: confirmpassword,
        birth_year: '',
        country: '',
      })
      .then(
        (response) => {
          // console.log(response);
          dispatch(loginUser(response.data));
        },
        (error) => {
          for (let i in error.response.data) {
            setError(error.response.data[i]);
            setOpen(true);
            break;
          }
        }
      );
  };
  const handleMobileChange = (event) => {
    setMobile(event);

    if (mobile.length !== 12) setMobileerror(true);
    else setMobileerror(false);
  };
  const handleCheckClick = (event) => {
    setCheckValue(event.target.checked);
  };
  const handleEmailChange = (event) => {
    const email = event.target.value;
    setEmail(email);
  };
  const handleFirstnameChange = (event) => {
    const firstname = event.target.value;
    setFirstname(firstname);
  };
  const handleLastnameChange = (event) => {
    const lastname = event.target.value;
    setLastname(lastname);
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
        (confirmpassword.length >= 8 && password !== confirmpassword)
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
  // const call_redirect = (url) => {
  //   history.push(url);
  // };
  const handleResend = (event) => {
    console.log('ss');
    axios
      .post(otp_resend_url, {
        mobile: mobile.substring(3),
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
          {/* <form className={classes.form}  onSubmit={e => e.preventDefault()}> */}
          <ValidatorForm
            // ref="form"
            onSubmit={handleSubmit}
            onError={(errors) => console.log(errors)}
          >
            {/* <MuiPhoneNumber defaultCountry={'us'} onChange={handleOnChange}/> */}

            <MuiPhoneInput
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone"
              name="phone"
              // autoComplete="phone"
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
              onChange={handleMobileChange}
              value={mobile}
              helperText={`${
                mobile.length < 13 && mobile.length > 3
                  ? 'Invalid phone number'
                  : ''
              }`}
              error={mobileerror}
              // validators={['required', 'isPhone']}
              //   validators={['minNumber:10', 'maxNumber:10', 'matchRegexp:^[0-9]$']}
              //errorMessages={['this field is required', 'phone is not valid']}
            />
            {/* <TextValidator
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone"
            name="phone"
            autoComplete="phone"
            autoFocus
            className="Register_text"
            onChange={handleMobileChange}
            value={mobile}
            validators={['required', 'isPhone']}
            validators={['minNumber:10', 'maxNumber:10', 'matchRegexp:^[0-9]$']}
            errorMessages={['this field is required', 'phone is not valid']}
            InputProps={{
              startAdornment: <InputAdornment position="start">+91</InputAdornment>
            }}
          /> */}
            <TextValidator
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
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="first_name"
              label="First Name"
              type="text"
              id="first_name"
              inputProps={{
                maxLength: 20,
              }}
              autoComplete="first_name"
              onChange={handleFirstnameChange}
              value={firstname}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              inputProps={{
                maxLength: 20,
              }}
              name="last_name"
              label="Last Name"
              type="text"
              id="last_name"
              autoComplete="last_name"
              onChange={handleLastnameChange}
              value={lastname}
            />
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
                  : confirmpassword.length > 0 && confirmpassword !== password
                  ? 'Passwords does not match'
                  : ''
              }`}
              error={confirmpassworderror}
            />
            {isOtpSent && (
              <TextField
                variant="outlined"
                margin="normal"
                required
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

            <FormControlLabel
              style={{ pointerEvents: 'none' }}
              control={
                <Checkbox
                  onClick={handleCheckClick}
                  style={{ pointerEvents: 'auto' }}
                  color="default"
                />
              }
              label={
                <div>
                  <span>I accept the </span>
                  <Link
                    component={RouterLink}
                    style={{ pointerEvents: 'auto' }}
                    to="/terms"
                  >
                    terms of use &#38; privacy poilicy
                  </Link>
                </div>
              }
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
                disabled={!checkValue}
              >
                Submit
              </Button>
            )}

            <Grid container>
              <Grid item xs>
                <Link
                  component={RouterLink}
                  to="/Forgetpassword"
                  variant="body2"
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/login" variant="body2">
                  {'Do you have an account? Sign in'}
                </Link>
              </Grid>
            </Grid>
            {/* </form> */}
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
        </RootDiv>
      </Container>
    </>
  );
}
