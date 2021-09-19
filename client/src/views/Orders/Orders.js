import { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
// import makeStyles from '@mui/styles/makeStyles';
import { styled } from '@mui/material/styles';

import axios from 'axios';
import { useHistory } from 'react-router-dom';

import './Orders.css';

import { API_URL } from '../../CONSTANTS';

const Div = styled('div')(({ theme }) => ({
  margin: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    margin: '16px 0',
  },
}));

// const useStyles = makeStyles((theme) => ({
//   root: {
//     margin: theme.spacing(2),
//     [theme.breakpoints.down('md')]: {
//       margin: '16px 0',
//     },
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

const Orders = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const orders_url = `${API_URL}api/orders/`;
  let history = useHistory();
  console.log(orders);
  useEffect(() => {
    axios.get(orders_url).then((res) => {
      // return dispatch(fetchProduct(res.data.results));
      console.log(res);
      setOrders(res.data);

      //setAddressId(res.data.results[0].id)
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const callOrderDetail = (order_code) => {
    history.push('/orderdetail/RAAV' + order_code + '/');
  };
  return (
    <Div>
      <Grid container spacing={3}>
        {orders.length > 0 ? (
          orders.map((order) => (
            <Grid item xs={12} sm={4}>
              {/* <Paper className={classes.paper}> */}
              <Card>
                <CardHeader
                  sx={{
                    padding: 2,
                    textAlign: 'center',
                    background: '#43a047',
                    color: 'white',
                    fontSize: '14px',
                  }}
                  title={'#RAAV' + order.id}
                  subheader={new Date(order.created_at).toDateString()}
                ></CardHeader>

                <CardContent>
                  <Typography sx={{ textAlign: 'center' }} gutterBottom>
                    <strong>No of Items Ordered :</strong> {order.items.length}
                  </Typography>

                  <Typography sx={{ textAlign: 'center' }} gutterBottom>
                    <strong>Total Price:</strong> ₹ {order.total_price}
                  </Typography>
                  <Typography sx={{ textAlign: 'center' }} gutterBottom>
                    <strong>Status :</strong> {order.order_status}
                  </Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    size="small"
                    sx={{
                      padding: 1,
                      textAlign: 'center',
                      background: '#43a047',
                      color: 'white',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                    onClick={() => callOrderDetail(order.id)}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <h4 className="Product_Text"> You have not ordered anything</h4>
        )}
      </Grid>
    </Div>
  );
};

export default Orders;
