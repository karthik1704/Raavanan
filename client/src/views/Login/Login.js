import { useEffect, useState } from 'react';

import { Helmet } from 'react-helmet';

// MUI
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import GoogleIcon from '@mui/icons-material/Google';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import MuiPhoneInput from 'material-ui-phone-number';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import GoogleLogin from 'react-google-login';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

// RHF
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

//RTK
import {
  useLoginMutation,
  useGoogleLoginMutation,
} from '../../features/auth/authApi';
import { toggleLoader } from '../../features/loader/loaderSlice';

import { loginSchema } from '../../schema/loginSchema';

import { styled } from '@mui/material/styles';

const Div = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

export default function Login() {
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const [error, setError] = useState({
    field: null,
    detail: null,
    non_field_errors: null,
  });

  let navigate = useNavigate();
  let location = useLocation();
  console.log(location);
  let from = location.state?.from?.pathname || '/';

  const [login] = useLoginMutation();
  const [googleLogin] = useGoogleLoginMutation();

  const handleLoginSubmit = async ({ phone, password }) => {
    error &&
      setError({
        field: null,
        detail: null,
        non_field_errors: null,
      });

    if (phone.length !== 13) return;
    try {
      await login({
        phone: phone.substring(3),
        password,
      }).unwrap();
      navigate(from, { replace: true });
    } catch (err) {
      if (err.data === undefined) {
        setError({
          ...error,
          detail: 'Something Went Wrong, Please try again',
        });
      } else if (err.data.non_field_errors) {
        setError({
          ...error,
          detail: 'Email or Password incorrect',
        });
      } else {
        setError(err.data);
      }
    }
  };

  const responseGoogle = async (response) => {
    console.log('I, am calling automatically');
    console.log(response);
    if (!('profileObj' in response)) {
      return;
    }

    try {
      await googleLogin({
        access_token: response['accessToken'],
        code: response['googleId'],
        id_token: response['tokenId'],
      }).unwrap();
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Helmet>
        <title>இராவணன் அங்காடி | Login</title>
      </Helmet>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          minHeight: '100vh',
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <IconButton
            sx={{ mr: 1 }}
            aria-label="Go Back"
            component={RouterLink}
            to=".."
          >
            {' '}
            <ArrowBackIcon />{' '}
          </IconButton>
          <Typography component="h1" variant="h3">
            SignIn
          </Typography>
        </Box>
        <Div>
          {error.detail && <Alert severity="error">{error?.detail}</Alert>}
          <Box component="form" onSubmit={handleSubmit(handleLoginSubmit)}>
            <Controller
              name="phone"
              defaultValue=""
              control={control}
              render={({ field, fieldState: { error } }) => (
                <MuiPhoneInput
                  variant="outlined"
                  margin="normal"
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
                    maxLength: 20,
                    autoComplete: 'false',
                  }}
                  countryCodeEditable="false"
                  helperText={error && error.message}
                  error={error && true}
                  {...field}
                />
              )}
            />

            <Controller
              name="password"
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
                    maxLength: 13,
                    autoComplete: 'false',
                  }}
                  helperText={error && error.message}
                  error={error && true}
                  {...field}
                />
              )}
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
                margin: (theme) => theme.spacing(1, 0, 2),
              }}
            >
              Sign In
            </Button>
            <Divider variant="middle">or</Divider>
            <Grid container>
              <Grid item xs>
                <GoogleLogin
                  clientId="968634425555-s10i7vv331eqcnbq7doe4o3acl6puv8f.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  isSignedIn={true}
                  render={(renderProps) => (
                    <Button
                      sx={{
                        margin: (theme) => theme.spacing(1, 0, 1),
                      }}
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      fullWidth
                      variant="outlined"
                      color="primary"
                      startIcon={<GoogleIcon />}
                    >
                      Login with Google
                    </Button>
                  )}
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
            </Grid>
            <br></br>
            <Grid container>
              <Grid item xs>
                <Link
                  component={RouterLink}
                  variant="body2"
                  underline="none"
                  to="/Forgetpassword"
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  component={RouterLink}
                  variant="body2"
                  underline="none"
                  to="/register"
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Div>
        {/* <Box mt={8}>
        <Copyright />
      </Box> */}
      </Container>
    </>
  );
}
