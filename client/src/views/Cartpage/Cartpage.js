import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './Cartpage.css';
import Icon from '@material-ui/core/Icon';
import Header from '../../components/Header/Header';

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
    backgroundColor: '#43a047',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  padding_bottom: {
    paddingBottom: 10,
  },
}));

export default function Otpverification() {
  const classes = useStyles();

  return (
    <>
      <Header title="Cart" subtitle="Home" />

      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={8}>
          <div>
            <div>
              <h3 className="Order_title">PRODUCTS</h3>
            </div>
            <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={3} className="Product_Text" >
            <div className="Product_Image_Container">
                <img  src="https://cdn.shopify.com/s/files/1/0108/7370/0415/products/Shop-2_medium.png?v=1583912700"/>
            </div>
            </Grid>
            <Grid item  xs={12} sm={12} md={3} className="Product_Text_Margin">
           <h3>Capsicum</h3>
           <h4>5 kg / Gold</h4>
           <p>$553.00</p>
            </Grid>
            <Grid item  xs={12} sm={12} md={3} className="Product_Text">
          <div className="Product_Increment">
          <Icon>add_circle</Icon>
          <p>1</p>
          <Icon>add_circle</Icon>
          </div>
            </Grid>
            <Grid item  xs={12} sm={12} md={3} className="Product_Text">
            <div >
            <h4>Total: $553.00</h4>
            </div>
            </Grid>
            </Grid>
          
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <div>
            <div className={classes.Order_summary}>
              <h3 className="Order_title">ORDER SUMMARY</h3>
            </div>
            <div className="Total_Text">
              <h3>Subtotal:</h3>
              <h3>₹ 556</h3>
            </div>
            <div>
              <p>
                Shipping, taxes, and discounts will be calculated at checkout.
              </p>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Check Out
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
