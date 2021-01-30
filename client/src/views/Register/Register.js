import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import MuiPhoneInput from 'material-ui-phone-number';

import { useSelector, useDispatch } from 'react-redux';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import './Register.css';
import Header from "../../components/Header/Header";


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

}));

// useEffect(() => {
//   axios.get(category === 'new' ? url : filterUrl).then((res) => {
//     return dispatch(fetchProduct(res.data.results));
//   });
// }, [dispatch, category, url, filterUrl]);



export default function Register() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [mobileerror, setMobileerror] = useState(false);
  const [passworderror, setPassworderror] = useState(false);
  const [confirmpassworderror, setConfirmpassworderror] = useState(false);
  
  const handleSubmit = (e) =>  {
    if(passworderror && confirmpassworderror && mobile !=13)
      return
    
    //axios.get(filterUrl).then((res) => {
  
      // return dispatch(fetchProduct(res.data.results));
  
   // });
  }
  const handleMobileChange = (event) => {

    setMobile(event);
    
    if(mobile.length != 12)
    setMobileerror(true)
    else
    setMobileerror(false)
    console.log(mobile)
}
const handleEmailChange = (event) => {
  const email = event.target.value;  
  setEmail(email);
}
const handleFirstnameChange = (event) => {
  const firstname = event.target.value;  
  setFirstname(firstname);
}
const handleLastnameChange = (event) => {
  const lastname = event.target.value;  
  setLastname(lastname);
}
const handlePasswordChange = (event) => {
  const password = event.target.value;  
  setPassword(password);
  if (password.length > 0 && password.length <8 )
  setPassworderror(true);
  else
  setPassworderror(false);
  if(confirmpassword.length >=8) {
    if(password == confirmpassword){
    setConfirmpassworderror(false);
    }
    else
    setConfirmpassworderror(true);
  }


}
const handleConfirmpasswordChange = (event) => {
  const confirmpassword = event.target.value;  
  setConfirmpassword(confirmpassword);
  if (confirmpassword.length > 0 ){
    if((confirmpassword.length < 8) || (confirmpassword.length >= 8 && password != confirmpassword))
      setConfirmpassworderror(true);
    else
    setConfirmpassworderror(false);

  }
  else
  setConfirmpassworderror(false);
  console.log(confirmpassworderror)
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
        <Typography component="h1" variant="h5">
         Register
        </Typography>
        {/* <form className={classes.form}  onSubmit={e => e.preventDefault()}> */}
        <ValidatorForm
                // ref="form"
                onSubmit={handleSubmit}
                onError={errors => console.log(errors)}
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
          defaultCountry='in'
          onlyCountries={['in']}
          //disableCountryCode = {true}
          //disableDropdown = {true}
          autoFormat = {false}
          inputProps={{
            maxlength :13,
            autocomplete : false
          }}
          countryCodeEditable = {false}
          onChange={handleMobileChange}
            value={mobile}
            helperText={`${mobile.length < 13 && mobile.length >3 ? 'Invalid phone number' :''}`}
            error = {mobileerror}
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
              maxlength: 20
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
              maxlength: 20
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
              maxlength: 20,
              autocomplete : false
            }}
            
            autoComplete={false}
            onChange={handlePasswordChange}
            value={password}
            validators={['required']}
            errorMessages={['Password is required']}
            helperText={`${password.length < 8 && password.length > 0? 'Password should be minimum 8 characters' :''}`}
            error = {passworderror}
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
            autoComplete={false}
            inputProps={{
              maxlength: 20,
              autocomplete : false
            }}
            onChange={handleConfirmpasswordChange}
            value={confirmpassword}
            validators={['required']}
            errorMessages={['Confirm password is required']}
            helperText={`${confirmpassword.length < 8 && confirmpassword.length > 0? 'Password should be minimum 8 characters' : confirmpassword.length >0 && confirmpassword != password ? 'Passwords does not match': ''}`}
            error = {confirmpassworderror}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
          type = 'submit'        
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            // onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Do you have an account? Sign in"}
              </Link>
            </Grid>
          </Grid>
          {/* </form> */}
        </ValidatorForm>
      </div>
    
    </Container>
    </>
  );
}