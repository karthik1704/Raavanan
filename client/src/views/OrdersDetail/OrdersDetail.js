import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector';

import customAxios from '../../navigation/NavigationService';
import { useDispatch } from 'react-redux';

import CartItem from '../../components/Checkout/cart-item';
import { API_URL } from '../../CONSTANTS';

import { styled } from '@mui/material/styles';
import './Orders.css';

const RootDiv = styled('div')(({ theme }) => ({
  margin: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    margin: '16px 0',
  },
  justifyContent: 'center',
}));

// const useStyles = makeStyles((theme) => ({
//   root: {
//     margin: theme.spacing(2),
//     [theme.breakpoints.down('md')]: {
//       margin: '16px 0',
//     },
//     justifyContent: 'center',
//   },
//   inline: {
//     display: 'inline',
//   },
//   paper: {
//     fontSize: '14 px',
//     padding: theme.spacing(2),
//     textAlign: 'center',
//     // color: theme.palette.text.secondary,
//   },
//   cardheader: {
//     padding: theme.spacing(2),
//     textAlign: 'center',
//     background: '#43a047',
//     color: 'white',
//     fontSize: '14px',
//   },
//   btn: {
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     background: '#43a047',
//     color: 'white',
//     display: 'flex',
//     justifyContent: 'center',
//   },
//   title: {
//     // padding: theme.spacing(1),
//     textAlign: 'center',
//   },
//   cardbottom: {
//     // padding: theme.spacing(1),
//     display: 'flex',
//     justifyContent: 'center',
//   },
// }));

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`&.${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`&.${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

// const QontoConnector = withStyles({
//   alternativeLabel: {
//     top: 10,
//     left: 'calc(-50% + 16px)',
//     right: 'calc(50% + 16px)',
//   },
//   active: {
//     '& $line': {
//       borderColor: '#784af4',
//     },
//   },
//   completed: {
//     '& $line': {
//       borderColor: '#784af4',
//     },
//   },
//   line: {
//     borderColor: '#eaeaf0',
//     borderTopWidth: 3,
//     borderRadius: 1,
//   },
// })(StepConnector);

const QontoStepIconRoot = styled('div')(({ theme, styleProps }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(styleProps.active && {
    color: '#784af4',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

// const useQontoStepIconStyles = makeStyles({
//   root: {
//     color: '#eaeaf0',
//     display: 'flex',
//     height: 22,
//     alignItems: 'center',
//   },
//   active: {
//     color: '#784af4',
//   },
//   circle: {
//     width: 8,
//     height: 8,
//     borderRadius: '50%',
//     backgroundColor: 'currentColor',
//   },
//   completed: {
//     color: '#784af4',
//     zIndex: 1,
//     fontSize: 18,
//   },
// });

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot styleProps={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

const OrdersDetail = () => {  
  const dispatch = useDispatch();
  const [order, setOrder] = useState({});
  const { id } = useParams();
  const orders_url = `${API_URL}api/order_detail/`;
  // eslint-disable-next-line no-unused-vars
  let history = useHistory();
  const [prodList, setProdList] = useState([]);
  const [activeStep, setActiveStep] = useState(1);
  const [total, setTotal] = useState(0);
  const [courier, setCourier] = useState(0);
  const steps = ['Placed', 'Shipped', 'Delivered'];

  useEffect(() => {
    var totals = 0
    customAxios.get(`${orders_url}${id}/`).then(
      (res) => {
        // return dispatch(fetchProduct(res.data.results));
        console.log(res);
        var step = 1;
        setOrder(res.data[0]);
        setProdList(res.data[0]['items']);
        if (res.data[0].order_status === 'Placed') step = 1;
        else if (res.data[0].order_status === 'In transit') step = 2;
        else if (res.data[0].order_status === 'Delivered') step = 3;
        else step = 0;
        setActiveStep(step);

        res.data[0]['items'].map((prod) => {
          console.log(prod)
          totals = totals + prod.product.total
        });

        setTotal(totals)


      },
      (error) => {
        console.log(error);

        // setError("Unable to process payment, Please try again later");
        // setOpen(true);
        return;
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // const callOrderDetail = () => {
  //   history.push('/order_detail');
  // };
  return (
    <RootDiv>
      <Grid container spacing={3}>
        {order.id ? (
          <>
            <Grid item xs={12} sm={6}>
              <Paper
                sx={{
                  fontSize: '14px',
                  padding: 2,
                  textAlign: 'center',
                }}
              >
                <Card>
                  <CardHeader
                    sx={{
                      padding: 2,
                      textAlign: 'center',
                      background: '#43a047',
                      color: 'white',
                      fontSize: '14px',
                    }}
                    title="Delivery Address"
                    // subheader="September 14, 2016"
                  ></CardHeader>
                  <CardContent>
                    <b>
                      {order.address.name} - {order.address.phone}
                    </b>
                    <br></br>
                    {order.address.address2}, {order.address.address1}
                    <br></br>
                    {order.address.city},<br></br>
                    {order.address.state} - {order.address.postal}
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper
                sx={{
                  fontSize: '14 px',
                  padding: 2,
                  textAlign: 'center',
                }}
              >
                <Card>
                  <CardHeader
                    sx={{
                      padding: 2,
                      textAlign: 'center',
                      background: '#43a047',
                      color: 'white',
                      fontSize: '14px',
                    }}
                    title="Delivery Status"
                    // subheader={new Date(order.created_at).toDateString()}
                  ></CardHeader>
                </Card>
                <Stepper
                  alternativeLabel
                  activeStep={activeStep}
                  connector={<QontoConnector />}
                >
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel StepIconComponent={QontoStepIcon}>
                        {label}
                      </StepLabel>
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
                  {prodList.length > 0 ? (
                    prodList.map((product) => (
                      <CartItem product={product['product']} />
                    ))
                  ) : (
                    <h4 className="Product_Text"> Your cart is empty</h4>
                  )}

<Grid item xs={12} sm={12} md={12} justify="space-between" container >
            <Grid item xs={12} sm={12} md={8}>
              </Grid>

            <Grid item xs={12} sm={12} md={4} >
          <div className='price_card'>
            <div>
              {/* className={classes.Order_summary} */}
              <h3 className="Order_title">ORDER SUMMARY</h3>
            </div>
            <div className="Total_Text">
              <h3>Price:</h3>
              <h3>₹ {total}.00</h3>
            </div>
            <div className="Total_Text">
              <h3>Courier Charges:</h3>
              <h3>₹ {order.delivery_charge}.00</h3>
            </div>
            <div>
              <hr></hr>
              {/* <p>Shipping, taxes, and discounts are included in the total.</p> */}
              <div className="Total_Text">
              <h3>Total:</h3>
              <h3>₹ {order.total_price}.00</h3>
            </div>
              
            </div>
          </div>
        </Grid>

        </Grid>
            

                </div>
              </Grid>
            </Grid>
            {/* </Grid> */}
          </>
        ) : (
          <h4 className="Product_Text">
            The URL you have entered is not correct
          </h4>
        )}
      </Grid>
    </RootDiv>
  );
};

export default OrdersDetail;
