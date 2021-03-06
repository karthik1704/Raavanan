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
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

import './Orders.css';


import { API_URL } from '../../CONSTANTS';


const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      margin: '16px 0',
    },
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



const Orders = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const orders_url = `${API_URL}api/orders/`;
  let history = useHistory()
  console.log(orders)
  useEffect(() => {
    axios.get(orders_url).then((res) => {
      // return dispatch(fetchProduct(res.data.results));
      console.log(res)
      setOrders(res.data);
      
      
      //setAddressId(res.data.results[0].id)
    });
  }, [dispatch]);
  const callOrderDetail = (order_code) =>{
    
    history.push('/orderdetail/RAAV'+order_code+'/')
  }
  return (
    <div className={classes.root}>
                                                
     <Grid container spacing={3}>

     {orders.length > 0
            ? 
        
            orders.map((order) => (
        <Grid item xs={12} sm={4}>
          {/* <Paper className={classes.paper}> */}
          <Card>
          <CardHeader className={classes.cardheader}
        
        title={"#RAAV"+order.id}
        subheader={new Date(order.created_at).toDateString()}
      >
      </CardHeader>
   
      <CardContent>
        <Typography className={classes.title}  gutterBottom>
          <strong>No of Items Ordered :</strong> {order.items.length}
        </Typography>      
       
        <Typography className={classes.title}  gutterBottom>
        <strong>Total Price:</strong> ₹ {order.total_price}
        </Typography>
        <Typography className={classes.title}  gutterBottom>
        <strong>Status :</strong> {order.order_status}
        </Typography>
        
      </CardContent>
      <CardActions className={classes.cardbottom}>
        <Button size="small" className={classes.btn} onClick={() => callOrderDetail(order.id)} >View Details</Button>
      </CardActions>
    </Card>
   
        </Grid>
        
             
              ))
            
            : <h4 class="Product_Text"> You have not ordered anything</h4> 
      }
      </Grid>
    </div>
  );
};

export default Orders;
