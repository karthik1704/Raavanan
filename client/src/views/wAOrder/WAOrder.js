import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import axois from 'axios';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import { styled } from '@mui/material/styles';
import { API_URL } from '../../CONSTANTS';

const Header = styled('div')(({ theme }) => ({
  display: 'flex',
}));

const Image = styled('img')(({ theme }) => ({
  height: 115,
  width: 60,
  [theme.breakpoints.down('md')]: {
    width: 50,
  },
}));

const CenterContent = styled('div')(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const Grow = styled('div')(({ theme }) => ({
  display: 'flex',
}));

const Form = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',

  '& .MuiTextField-root': {
    margin: theme.spacing(1),
    width: '25ch',
    [theme.breakpoints.down('md')]: {
      width: 'auto',
    },
  },
}));

// const useStyles = makeStyles((theme) => ({
//   root: {
//     margin: theme.spacing(2),
//     [theme.breakpoints.down('md')]: {
//       margin: '16px 0',
//     },
//   },
//   card: {
//     display: 'flex',
//     [theme.breakpoints.down('md')]: {
//       flexDirection: 'column',
//     },
//     // [theme.breakpoints.up('md')]: {
//     //   flexDirection: 'row',
//     // },
//   },
//   header: {
//     display: 'flex',
//     [theme.breakpoints.down('md')]: {
//       display: 'flex',
//     },
//   },
//   center: {
//     display: 'flex',
//     [theme.breakpoints.down('md')]: {
//       display: 'flex',
//       flexDirection: 'column',
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//   },
//   image: {
//     height: 115,
//     width: 60,
//     [theme.breakpoints.down('md')]: {
//       width: 50,
//     },
//   },
//   grow: {
//     flex: 1,
//   },
//   margin: {
//     margin: theme.spacing(1),
//   },
//   orderForm: {
//     display: 'flex',
//     flexDirection: 'column',

//     '& .MuiTextField-root': {
//       margin: theme.spacing(1),
//       width: '25ch',
//       [theme.breakpoints.down('md')]: {
//         width: 'auto',
//       },
//     },
//   },
//   nameForm: {
//     display: 'flex',
//     flexDirection: 'row',
//     [theme.breakpoints.down('md')]: {
//       flexDirection: 'column',
//     },
//   },
//   btnSize: {
//     width: '40%',
//     [theme.breakpoints.down('md')]: {
//       width: 'auto',
//     },
//   },
// }));

const WAOrder = (props) => {
  const [message, setMessage] = useState({});
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const { id } = useParams();
  const { state } = useLocation();

  console.log(state);
  useEffect(() => {
    axois.get(`${API_URL}product/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  useEffect(() => {
    if (state.material === 'இரப்பர்') {
      setPrice(product.price + 50);
    } else if (state.material === 'குழைமம் ( பிளாஸ்டிக் )') {
      setPrice(product.price);
    } else {
      setPrice(product.price);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

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

  const phonecase = `
மூலப்பொருள்: ${state.material}
`;

  const photoFramePrice = `
விலை: '₹' ${state.price}
எண்ணிக்கை: ${quantity},
மொத்த விலை: ₹.${state.price * quantity},
அளவு: ${state.size}
`;

  const OtherProductPrice = `
விலை: '₹' ${price},
எண்ணிக்கை: ${quantity},
மொத்த விலை: ₹.${price * quantity},
`;

  const sendMessage = (e) => {
    e.preventDefault();
    const waMessage = `
கோரிக்கை
=========
தயாரிப்பு எண்: ${id},
பொருளின் பெயர்: ${product.product_name}\n,
${
  product.category && product.category.name === 'படச்சட்டகம்'
    ? photoFramePrice
    : OtherProductPrice
}

${product.category && product.category.name === 'கைபேசி உறை' ? phonecase : ''}

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

  return (
    <div>
      <Grid
        container
        sx={{
          margin: { sm: '16px 0', md: 2 },
        }}
        spacing={2}
      >
        <Grid item xs={12}>
          <Card
            sx={{
              display: 'flex',
              flexDirection: {
                sm: 'column',
              },
            }}
          >
            <Header>
              <Image src={product.imageurl} alt={product.product_name} />
              <CardContent>
                <Typography component="h5" variant="h5">
                  {product.product_name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  விலை:{' '}
                  <strong>
                    ₹{' '}
                    {product.category && product.category.name === 'படச்சட்டகம்'
                      ? state.price
                      : price}{' '}
                  </strong>
                </Typography>
                {product.category && product.category.name === 'படச்சட்டகம்' && (
                  <Typography variant="subtitle1" color="textSecondary">
                    அளவு: {state.size}
                  </Typography>
                )}
              </CardContent>
            </Header>
            <Grow />

            <CenterContent>
              <CardContent>
                <TextField
                  id="Quantity"
                  label="எண்ணிக்கை"
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
                  ₹{' '}
                  {product.category && product.category.name === 'படச்சட்டகம்'
                    ? state.price * quantity
                    : price * quantity}
                </Typography>
              </CardContent>
            </CenterContent>
          </Card>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          margin: { sm: '16px 0', md: 2 },
        }}
        sapcing={2}
      >
        <Grid item xs={12}>
          <Card>
            <CardHeader title="தங்களது கோரிக்கை விவரங்களைப் பூர்த்தி செய்யவும்" />
            <CardContent>
              <Form onSubmit={sendMessage} validate="true">
                <FormControl
                  sx={{
                    display: 'flex',
                    flexDirection: { sm: 'column', md: 'row' },
                  }}
                >
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
                {product.category && product.category.name === 'கைபேசி உறை' && (
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
                  sx={{
                    width: { sm: 'auto', md: '40%' },
                  }}
                >
                  {' '}
                  பொருளை வாங்க{' '}
                </Button>
              </Form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default WAOrder;
