import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './NewFooter.css'
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop:40,
    paddingBottom:20,
    borderBottom:1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));
export default function FixedContainer() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <div className="Footer_Wrap">

  
      <Container fixed>
      <div className="Footer_Main_Wrap">
      <Grid container spacing={3}>
      
        <Grid item xs={12} sm={4}>
        <div className="Footer_Main_Container">
          <div className="Footer_Icon_Container">
       <DirectionsCarIcon />
          </div>
          <div className="Footer_Text_Details">
            <p>100% Satisfaction Guarantee</p>
            <p>Lorem ipsum dolor sit amet, cons...</p>
          </div>
        </div>
        </Grid>
        <Grid item xs={12} sm={4}>
        <div className="Footer_Main_Container">
          <div className="Footer_Icon_Container">
       <DirectionsCarIcon />
          </div>
          <div className="Footer_Text_Details">
            <p>Great Daily Deals Discount</p>
            <p>Lorem ipsum dolor sit amet, cons...</p>
          </div>
        </div>
        </Grid>
        <Grid item xs={12} sm={4}>
        <div className="Footer_Main_Container">
          <div className="Footer_Icon_Container">
       <DirectionsCarIcon />
          </div>
          <div className="Footer_Text_Details">
            <p>Free & Next Day Delivery</p>
            <p>Lorem ipsum dolor sit amet, cons...</p>
          </div>
        </div>
        </Grid>
       
      </Grid>
    </div>
      </Container>
      </div>
    </React.Fragment>
  );
}