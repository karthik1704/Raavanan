import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import axois from 'axios';

import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

import { makeStyles } from '@material-ui/core/styles';

import { API_URL } from '../../CONSTANTS';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  card: {
    display: 'flex',
  },
  image: {
    height: 115,
    width: 70,
  },
  grow: {
    flex: 1,
  },
  margin: {
    margin: theme.spacing(1),
  },
  orderForm: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}));

const WAOrder = () => {
  const [message, setMessage] = useState({});
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  useEffect(() => {
    axois
      .get(`${API_URL}api/product/${id}`)
      .then((res) => setProduct(res.data));
  }, [id]);

  const handleQuantity = (e) => {
    if (e.target.value <= 0) {
      setQuantity(1);
    } else {
      setQuantity(Number(e.target.value));
    }
  };

  const handleChange = (e) => {
    setMessage({
      ...message,
      [e.target.name]: e.target.value,
    });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const waMessage = `
கோரிக்கை
====
தயாரிப்பு எண்: ${id.slice(2)},
பொருளின் பெயர்: ${product.product_name},
Quantity: ${quantity},
விலை: ₹.${product.price * quantity}

வாடிக்கையாளர் தகவல்
=================
பெயர்: ${message.firstname} ${message.lastname},\n
கைபேசி மாதிரி: ${message.mobile},\n
முகவரி: \n${message.address},
அஞ்சல் குறியீடு: ${message.pincode},\n
கைபேசி எண்: ${message.phone}.
    `;

    const encodeMessage = encodeURIComponent(waMessage);

    console.log(waMessage);
    console.log(encodeMessage);

    const WALINK = `https://wa.me/917871003935/?text=${encodeMessage}`;
    window.open(WALINK);
  };

  const classes = useStyles();
  return (
    <div>
      <Grid container className={classes.root} sapcing={2}>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <img
              className={classes.image}
              src={product.imageurl}
              alt={product.product_name}
            />
            <CardContent>
              <Typography component="h5" variant="h5">
                {product.product_name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Price: <strong>₹ {product.price} </strong>
              </Typography>
            </CardContent>
            <div className={classes.grow} />
            <CardContent>
              <TextField
                id="Quantity"
                label="Quantity"
                name="quantity"
                type="number"
                value={quantity}
                onChange={handleQuantity}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </CardContent>
            <CardContent>
              <Typography> Total </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                ₹ {product.price * quantity}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container className={classes.root} sapcing={2}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Order" />
            <CardContent>
              <form onSubmit={sendMessage} className={clsx(classes.orderForm)}>
                <FormControl className={classes.margin}>
                  <TextField
                    id="first-name"
                    label="First Name"
                    name="firstname"
                    variant="outlined"
                    onChange={handleChange}
                  />
                  <TextField
                    id="last-name"
                    label="Last Name"
                    name="lastname"
                    variant="outlined"
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <TextField
                    id="extra"
                    label="Mobile Model Name"
                    name="mobile"
                    variant="outlined"
                    onChange={handleChange}
                  />
                </FormControl>
                <TextField
                  id="address"
                  label="Address"
                  name="address"
                  multiline
                  rowsMax={7}
                  variant="outlined"
                  onChange={handleChange}
                />
                <TextField
                  id="pincode"
                  label="Pin Code"
                  name="pincode"
                  variant="outlined"
                  onChange={handleChange}
                />

                <TextField
                  id="phonenumber"
                  label="Phone Number"
                  name="phone"
                  variant="outlined"
                  onChange={handleChange}
                />

                <Button
                  color="primary"
                  startIcon={<WhatsAppIcon />}
                  variant="contained"
                  type="submit"
                >
                  {' '}
                  Order{' '}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default WAOrder;
