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
  const handleSubmit = (e) =>  {
    alert("ss")
    console.log("handle submit")
    //axios.get(filterUrl).then((res) => {
  
      // return dispatch(fetchProduct(res.data.results));
  
   // });
  }
  const handleMobileChange = (event) => {
    const mobile = event.target.value;
    console.log(mobile)
    setMobile(mobile);
}
const handleEmailChange = (event) => {
  const email = event.target.value;
  console.log(email)
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
        <Typography component="h1" variant="h5">
         Register
        </Typography>
        {/* <form className={classes.form}  onSubmit={e => e.preventDefault()}> */}
        <ValidatorForm
                // ref="form"
                onSubmit={handleSubmit}
                onError={errors => console.log(errors)}
            >
        <TextValidator
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
            // validators={['required', 'isEmail']}
            validators={['minNumber:0', 'maxNumber:10', 'matchRegexp:^[0-9]$']}
            errorMessages={['this field is required', 'email is not valid']}
            // InputProps={{
            //   startAdornment: <InputAdornment position="start">+91</InputAdornment>
            // }}
          />
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
            autoComplete="first_name"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="last_name"
            label="Last Name"
            type="text"
            id="last_name"
            autoComplete="last_name"
          />
             <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete={false}
          />
             <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirm_password"
            label="Confirm Password"
            type="password"
            id="confirm_password"
            autoComplete={false}
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
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
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