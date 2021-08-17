import { useState } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

import MuiPhoneInput from 'material-ui-phone-number';

import axios from 'axios';
import GoogleLogin from 'react-google-login';
import { useSelector, useDispatch } from 'react-redux';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header/Header';
import { API_URL } from '../../CONSTANTS';
import { loginUser } from '../../data/actions/loginActions';

import { Styled } from '@material-ui/core/styles';

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const Div = Styled('div')(({ theme }) => ({
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
//   },
// }));

export default function Login() {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [mobileerror, setMobileerror] = useState(false);
  const [passworderror, setPassworderror] = useState(false);
  const cart = useSelector((state) => state.cart);
  const login = useSelector((state) => state.login);
  const dispatch = useDispatch();
  let history = useHistory();
  const login_url = `${API_URL}api/auth/login/`;
  const social_login_url = `${API_URL}api/auth/google/`;
  const sync_url = `${API_URL}api/carts/sync_cart/`;
  const handleSubmit = (e) => {
    if (passworderror && mobile.length !== 13) return;
    axios
      .post(login_url, {
        phone: mobile.substring(3),
        password: password,
      })
      .then(
        (response) => {
          dispatch(loginUser(response.data));
        },
        (error) => {
          console.log(error);
        }
      );
  };

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
  };
  const call_redirect = (url) => {
    history.push(url);
  };
  const responseGoogle = (response) => {
    console.log(response);
    if (!('profileObj' in response)) {
      return;
    }
    axios
      .post(social_login_url, {
        access_token: response['accessToken'],
        code: response['googleId'],
        id_token: response['tokenId'],
      })
      .then(
        (response) => {
          dispatch(loginUser(response.data));
        },
        (error) => {
          console.log(error);
        }
      );
  };
  return (
    <>
      <Header title="Login Here" subtitle="Home" />
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
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <ValidatorForm
            // ref="form"
            onSubmit={handleSubmit}
            onError={(errors) => console.log(errors)}
          >
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
            {/* <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          /> */}
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
                maxlength: 20,
                autocomplete: false,
              }}
              autoComplete={false}
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                margin: (theme) => theme.spacing(3, 0, 2),
              }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                {' '}
              </Grid>

              <Grid item xs>
                <GoogleLogin
                  clientId="968634425555-s10i7vv331eqcnbq7doe4o3acl6puv8f.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  isSignedIn={true}
                  scopes={[
                    'email',
                    'profile',
                    'https://www.googleapis.com/auth/user.phonenumbers.read',
                    'https://www.googleapis.com/auth/user.addresses.read',
                    'https://www.googleapis.com/auth/user.birthday.read',
                  ]}
                  cookiePolicy={'single_host_origin'}
                />
              </Grid>
              <Grid item xs>
                {' '}
              </Grid>
            </Grid>
            <br></br>
            <Grid container>
              <Grid item xs>
                <Link
                  variant="body2"
                  onClick={() => call_redirect('/Forgetpassword')}
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  onClick={() => call_redirect('/register')}
                  variant="body2"
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </ValidatorForm>
        </Div>
        {/* <Box mt={8}>
        <Copyright />
      </Box> */}
      </Container>
    </>
  );
}
