import { useState } from 'react';
import { Link as RemixLink , Form} from '@remix-run/react';

import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import MuiPhoneInput from 'mui-phone-number';

import { styled } from '@mui/material/styles';



const Div = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));


export const action = async({request})=>{
    const body = await request.formData()
    console.log(body.get('phone'), body.get('password'))

    return {
        ok: 'success'
    }

}



export default function Login() {
  
  
  return (
    <>
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
          
          <Form  method="post">
          
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
                 
                />
          

       
                <TextField
                name="password"

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
          
            <br></br>
            <Grid container>
              <Grid item xs>
                <Link
                  component={RemixLink}
                  variant="body2"
                  underline="none"
                  to="/Forgetpassword"
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  component={RemixLink}
                  variant="body2"
                  underline="none"
                  to="/create-account"
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Form>
        </Div>
  
      </Container>
    </>
  );
}
