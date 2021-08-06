import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import React from 'react';
import axois from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useSelector, useDispatch } from 'react-redux';
import makeStyles from '@material-ui/styles/makeStyles';
import withStyles from '@material-ui/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import StepConnector from "@material-ui/core/StepConnector";
import CartItem from '../../components/Checkout/cart-item'
import './Orders.css';


import { API_URL } from '../../CONSTANTS';


const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      margin: '16px 0',
    },
    justifyContent: 'center'
  },
  inline: {
    display: 'inline',
  },
  paper: {
    fontSize: '14 px',
    padding: theme.spacing(2),
    textAlign: 'center',
    // color: theme.palette.text.secondary,
  },
  cardheader: {
    padding: theme.spacing(2),
    textAlign: 'center',   
    background: '#43a047',
    color: 'white',
    fontSize : '14px'
  },
  btn: {
    padding: theme.spacing(1),
    textAlign: 'center',   
    background: '#43a047',
    color: 'white',
    display:'flex',
    justifyContent: 'center'
  },
  title: {
    // padding: theme.spacing(1),
    textAlign: 'center',   
   
  },
  cardbottom: {
    // padding: theme.spacing(1),
    display: 'flex',   
    justifyContent: 'center',   
   
  },
  

}));

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)"
  },
  active: {
    "& $line": {
      borderColor: "#784af4"
    }
  },
  completed: {
    "& $line": {
      borderColor: "#784af4"
    }
  },
  line: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1
  }
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center"
  },
  active: {
    color: "#784af4"
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor"
  },
  completed: {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18
  }
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}


const OrdersDetail = () => {
  console.log("order details")
  const classes = useStyles();
  const dispatch = useDispatch();
  const [order, setOrder] = useState({});
  const { id } = useParams();
  const orders_url = `${API_URL}api/order_detail/`;
  let history = useHistory()
  const [prodList, setProdList] = React.useState([]);
  const [activeStep, setActiveStep] = React.useState(1);
  const steps = ["Placed", "Shipped", "Delivered"];
  
  useEffect(() => {
    axios.get(`${orders_url}${id}/`).then((res) => {
      // return dispatch(fetchProduct(res.data.results));
      console.log(res)
      var step = 1;
      setOrder(res.data[0]);  
      setProdList(res.data[0]['items'])  
      if (res.data[0].order_status  == 'Plac2ed')
        step =1 
      else if (res.data[0].order_status  == 'In transit')
        step =2 
      else if (res.data[0].order_status  == 'Delivered')
        step =3 
      else 
        step =0 
      setActiveStep(step)
    },(error) => {
      console.log(error);
  
     // setError("Unable to process payment, Please try again later");
      // setOpen(true);
      return;
    })
  }, [dispatch]);
  const callOrderDetail = () =>{
    history.push('/order_detail')
  }
  return (
    <div className={classes.root}>
                                                
     <Grid container spacing={3}>

     { order.id
            ? <>
            <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
            <Card>
          <CardHeader className={classes.cardheader}
        
        title="Delivery Address"
        // subheader="September 14, 2016"
      >
      </CardHeader>
      <CardContent>
        <b>{order.address.name} - {order.address.phone}</b><br></br>{order.address.address2}, {order.address.address1}
        <br></br>
        {order.address.city},
        <br></br>
        {order.address.state} - {order.address.postal}

      </CardContent>
      </Card>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
            <Card>
          <CardHeader className={classes.cardheader}
        
        title="Delivery Status"
        // subheader={new Date(order.created_at).toDateString()}
      >
      </CardHeader>
   </Card>
            <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<QontoConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
            </Paper>
          </Grid>
           
        <Grid item xs={12} sm={12}>
          {/* <Paper className={classes.paper}> */}
          {/* <Card>
          <CardHeader className={classes.cardheader}
        
        title={"#RAAV"+order.id}
        subheader={new Date(order.created_at).toDateString()}
      >
      </CardHeader>
   
      <CardContent>
        <Typography className={classes.title}  gutterBottom>
          <strong>No of Items Ordered :</strong> {order.id}
        </Typography>      
       
        <Typography className={classes.title}  gutterBottom>
        <strong>Total Price:</strong> ₹ {order.total_price}
        </Typography>
        <Typography className={classes.title}  gutterBottom>
        <strong>Status :</strong> {order.order_status}
        </Typography>
        
      </CardContent>
      <CardActions className={classes.cardbottom}>
        <Button size="small" className={classes.btn}onClick={callOrderDetail} >View Details</Button>
      </CardActions>
    </Card>
    */}
     {/* <Grid container spacing={12}> */}
        <Grid item xs={12} sm={12} md={12}>
          <div>
            <div>
              <h3 className="Order_title">PRODUCTS</h3>
            </div>
            {prodList.length > 0
            ? 
        
            prodList.map((product) => (              
              
              <CartItem product={ product['product']} />            
             
              ))
            
            : <h4 class="Product_Text"> Your cart is empty</h4> 
      }
            
          </div>
        </Grid>
    

      </Grid>
        {/* </Grid> */}
        
             
            </>
            
            : <h4 class="Product_Text">The URL you have entered is not correct</h4> 
      }
      </Grid>
    </div>
  );
};

export default OrdersDetail;
