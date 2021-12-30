import { Helmet } from 'react-helmet';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { styled } from '@mui/material/styles';

import { Link } from 'react-router-dom';

import { useGetOrderQuery } from '../../features/orders/orderApi';

import './Orders.css';

const Div = styled('div')(({ theme }) => ({
  margin: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    margin: '16px 0',
  },
}));

const Orders = () => {
  const { data: orders, isLoading, isFetching, error } = useGetOrderQuery();

  return (
    <>
      <Helmet>
        <title>இராவணன் அங்காடி | தனியுரிமைக் கொள்கைகள் </title>
      </Helmet>

      <Div>
        <Grid container spacing={3}>
          {orders ? (
            orders.map((order) => (
              <Grid item xs={12} sm={4} key={order.id}>
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
                      <strong>No of Items Ordered :</strong>{' '}
                      {order.items.length}
                    </Typography>

                    <Typography sx={{ textAlign: 'center' }} gutterBottom>
                      <strong>Total Price:</strong> ₹ {order.total_price}
                    </Typography>
                    <Typography sx={{ textAlign: 'center' }} gutterBottom>
                      <strong>Status :</strong> {order.order_status}
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{ display: 'flex', justifyContent: 'center' }}
                  >
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
                      component={Link}
                      to={`/RAAV${order.id}`}
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
    </>
  );
};

export default Orders;

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
