import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import MuiPhoneInput from 'material-ui-phone-number';

import axios from 'axios';
import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';
// import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Link as RouterLink } from 'react-router-dom';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Header from '../../components/Header/Header';
import { API_URL } from '../../CONSTANTS';
import { loginUser } from '../../data/actions/loginActions';

import { styled } from '@mui/material/styles';

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
//   },
// }));
const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const schema = yup.object().shape({
  phone: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Please enter Phonenumber'),
  password: yup.string().required('Please enter password'),
});

export default function Login() {
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
  });

  // const cart = useSelector((state) => state.cart);
  // const login = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const login_url = `${API_URL}api/auth/login/`;
  const social_login_url = `${API_URL}api/auth/google/`;

  // const sync_url = `${API_URL}api/carts/sync_cart/`;

  const handleLoginSubmit = ({ phone, password }) => {
    if (phone.length !== 13) return;
    axios
      .post(login_url, {
        phone: phone.substring(3),
        password,
      })
      .then((response) => {
        dispatch(loginUser(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
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
          <Box
            component="form"
            // ref="form"
            onSubmit={handleSubmit(handleLoginSubmit)}
          >
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
                  autoComplete="false"
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
