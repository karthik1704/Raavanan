import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Header from "../../components/Header/Header";

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

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor:"#43a047"
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  padding_bottom:
  {
      paddingBottom:10,
  }

}));

export default function Forgetpassword() {
  const classes = useStyles();
  const [email, setEmail] = useState('');

  const handleSubmit = (e) =>  {
   
  }
  const handleEmailChange = (event) => {
    const email = event.target.value;  
    setEmail(email);
  }
  return (
      <>
       <Header title="Create Account"  subtitle="Home"/>
   
    <Container component="main" maxWidth="xs">
      <CssBaseline />

     
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" className={classes.padding_bottom}>
        Reset your password


        </Typography>
        <Typography component="p" variant="p">
        We will send you an email to reset your password.

        </Typography>
        <ValidatorForm
                // ref="form"
                onSubmit={handleSubmit}
                onError={errors => console.log(errors)}
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
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
          Submit
          </Button>
        
        </ValidatorForm>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
    </>
  );
}