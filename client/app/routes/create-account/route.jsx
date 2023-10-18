/* eslint-disable no-unreachable */
import React, { useState } from 'react';
import { Link as RemixLink, Form } from '@remix-run/react';

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

import MuiPhoneInput from 'mui-phone-number';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { styled } from '@mui/material/styles';

const RootDiv = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

export const action = async ({request})=>{
    const body = await request.formData()
    console.log(body.entries())
    return {
        ok:'success'
    }
}

export default function Register() {
  return (
    <>
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

          <Form method="post">
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
              name="phone"
            />

            <TextField
              name="email"
              variant="outlined"
              margin="normal"
              fullWidth
              label="Email Address"
              autoComplete="email"
              className="Register_text"
            />

            <TextField
              name="first_name"
              variant="outlined"
              margin="normal"
              fullWidth
              label="First Name"
              type="text"
              inputProps={{
                maxLength: 20,
              }}
              autoComplete="first_name"
            />

            <TextField
              name="last_name"
              variant="outlined"
              margin="normal"
              fullWidth
              label="Last Name"
              type="text"
              inputProps={{
                maxLength: 20,
              }}
              autoComplete="first_name"
            />

            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              inputProps={{
                maxLength: 20,
                autoComplete: 'false',
              }}
            />

            <TextField
              name="password2"
              variant="outlined"
              margin="normal"
              fullWidth
              label="Confirm Password"
              type="password"
              inputProps={{
                maxLength: 20,
                autoComplete: 'false',
              }}
            />

            <FormControl variant="standard">
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox name="terms" color="secondary" />}
                  label={
                    <>
                      I accept the{' '}
                      <Link
                        underline="hover"
                        style={{ pointerEvents: 'auto' }}
                        component={RemixLink}
                        to="/terms"
                      >
                        terms of use &#38; privacy poilicy
                      </Link>
                    </>
                  }
                />
              </FormGroup>
            </FormControl>

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

            <Grid
              container
              sx={{
                justifyContent: 'end',
              }}
            >
              <Grid item>
                <Link
                  component={RemixLink}
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
          </Form>
        </RootDiv>
      </Container>
    </>
  );
}
