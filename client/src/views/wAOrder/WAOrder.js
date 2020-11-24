import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import axois from 'axios';

import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
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
    [theme.breakpoints.down('sm')]: {
      margin: '16px 0',
    },
  },
  card: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
    // [theme.breakpoints.up('md')]: {
    //   flexDirection: 'row',
    // },
  },
  header: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
    },
  },
  center: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  image: {
    height: 115,
    width: 60,
    [theme.breakpoints.down('sm')]: {
      width: 50,
    },
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

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
      [theme.breakpoints.down('sm')]: {
        width: 'auto',
      },
    },
  },
  nameForm: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  btnSize: {
    width: '40%',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
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
=========
தயாரிப்பு எண்: ${id.slice(2)},
பொருளின் பெயர்: ${product.product_name}\n,
விலை: ₹ ${product.price}
எண்ணிக்கை: ${quantity},
மொத்த விலை: ₹.${product.price * quantity}

வாடிக்கையாளர் தகவல்
=======================
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
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <div className={classes.header}>
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
                  விலை: <strong>₹ {product.price} </strong>
                </Typography>
              </CardContent>
            </div>
            <div className={classes.grow} />

            <div className={classes.center}>
              <CardContent>
                <TextField
                  id="Quantity"
                  label="என்ணிக்கை"
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
                <Typography> மொத்த விலை </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  ₹ {product.price * quantity}
                </Typography>
              </CardContent>
            </div>
          </Card>
        </Grid>
      </Grid>
      <Grid container className={classes.root} sapcing={2}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="தங்களது கோரிக்கை விவரங்களைப் பூர்த்தி செய்யவும்" />
            <CardContent>
              <form
                onSubmit={sendMessage}
                className={clsx(classes.orderForm)}
                validate="true"
              >
                <FormControl className={classes.nameForm}>
                  <TextField
                    id="first-name"
                    label="பெயர்"
                    name="firstname"
                    variant="outlined"
                    onChange={handleChange}
                    required
                  />
                  <TextField
                    id="last-name"
                    label="இறுதிப் பெயர்"
                    name="lastname"
                    variant="outlined"
                    onChange={handleChange}
                    required
                  />
                </FormControl>
                {product.category &&
                  product.category.category_name === 'கைபேசி உறை' && (
                    <FormControl>
                      <TextField
                        id="extra"
                        label="கைபேசி வகை"
                        name="mobile"
                        variant="outlined"
                        onChange={handleChange}
                        required
                        fullWidth
                      />
                    </FormControl>
                  )}
                <TextField
                  id="address"
                  label="முகவரி"
                  name="address"
                  multiline
                  rows={4}
                  variant="outlined"
                  onChange={handleChange}
                  required
                />
                <TextField
                  id="pincode"
                  label="அஞ்சல் குறியீட்டு எண்"
                  name="pincode"
                  type="number"
                  variant="outlined"
                  onChange={handleChange}
                  required
                />

                <TextField
                  id="phonenumber"
                  label="கைபேசி எண்"
                  name="phone"
                  type="number"
                  variant="outlined"
                  onChange={handleChange}
                  required
                />

                <Button
                  color="primary"
                  startIcon={<WhatsAppIcon />}
                  variant="contained"
                  type="submit"
                  size="medium"
                  className={classes.btnSize}
                >
                  {' '}
                  பொருளை வாங்க{' '}
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
