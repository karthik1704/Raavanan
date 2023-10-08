import { useState, useEffect } from 'react';
import {
  useLoaderData,
  useActionData,
  Form as RemixForm,
} from '@remix-run/react';

import {
  Box,
  Button,
  Card,
  Divider,
  CardContent,
  CardHeader,
  Grid,
  FormControl,
  TextField,
  Typography,
} from '@mui/material';

import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import { styled } from '@mui/material/styles';
import { API_URL } from '~/config';
import { json , redirect } from '@remix-run/node';

const Header = styled('div')(({ theme }) => ({
  display: 'flex',
}));

const Image = styled('img')(({ theme }) => ({
  height: 100,
  width: 100,
  paddingTop: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    width: 100,
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

const FormBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',

  '& .MuiTextField-root': {
    width: '30ch',
    marginTop: theme.spacing(1),

    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(1),
      width: 'auto',
    },
  },
}));

export const loader = async ({ params }) => {
  const res = await fetch(`${API_URL}/api/variant/detail/${params.id}/`, {
    headers: { connection: 'keep-alive' },
  });
  const product = await res.json();
  const resRequest = await fetch(`${API_URL}/api/request/RAV2023103/`, {
    headers: { connection: 'keep-alive' },
  });
  const extras = await resRequest.json();

  return json({ product, extras });
};

export const action = async ({request, params})=>{
  const fieldNames = ['first_name', 'last_name', 'address', 'quantity','pincode','phone_number',"product_id" ]

  const body = await request.formData()
  const bodyObj = Object.fromEntries(body.entries())
  const extra_info = [];

  for (const [key, value] of Object.entries(bodyObj)){
    if (!fieldNames.includes(key)){
        extra_info.push({
          question: key, 
          answer: value,
          image:null
        })
        delete bodyObj.key
    }
  }

  bodyObj.extra_info = extra_info
  bodyObj.extra = ''
  bodyObj.landmark = null
  const res = await fetch(`${API_URL}/api/waorder/`, {
    method:'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyObj),
  })

  const result = await res.json()
  console.log(result)

  if (res.ok) return redirect(`/order/${result.order_id}/success/`)

  return redirect('.')

};

const WAOrder = (props) => {
  const [message, setMessage] = useState({});
  const [quantity, setQuantity] = useState(1);
  const { product, extras } = useLoaderData();

  useEffect(() => {
    if (quantity <= 0) {
      setQuantity(1);
    }
  }, [quantity]);

  //   const phonecase = `
  // மூலப்பொருள்: ${state.material}
  // `;

  //   const photoFramePrice = `
  // விலை: '₹' ${state.price}
  // எண்ணிக்கை: ${quantity},
  // மொத்த விலை: ₹.${state.price * quantity},
  // அளவு: ${state.size}
  // `;

  //   const OtherProductPrice = `
  // விலை: '₹' ${price},
  // எண்ணிக்கை: ${quantity},
  // மொத்த விலை: ₹.${price * quantity},
  // `;

  //   const sendMessage = (e) => {
  //     e.preventDefault();
  //     const waMessage = `
  // கோரிக்கை
  // =========
  // தயாரிப்பு எண்: ${id},
  // பொருளின் பெயர்: ${product.product_name}\n,
  // ${
  //   product.category && product.category.name === 'படச்சட்டகம்'
  //     ? photoFramePrice
  //     : OtherProductPrice
  // }

  // ${product.category && product.category.name === 'கைபேசி உறை' ? phonecase : ''}

  // வாடிக்கையாளர் தகவல்
  // =======================
  // பெயர்: ${message.firstname} ${message.lastname},\n
  // கைபேசி மாதிரி: ${message.mobile},\n
  // முகவரி: \n${message.address},
  // அஞ்சல் குறியீடு: ${message.pincode},\n
  // கைபேசி எண்: ${message.phone}.
  //     `;

  //     const encodeMessage = encodeURIComponent(waMessage);

  //     console.log(waMessage);
  //     console.log(encodeMessage);

  //     const WALINK = `https://wa.me/917871003935/?text=${encodeMessage}`;
  //     window.open(WALINK);
  //   };

  return (
    <div>
      {' '}
      <RemixForm validate="true"  method="post">
        <Grid
          container
          sx={{
            // margin: { sm: '16px 0', md: 2 },
            my: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Grid item xs={12} md={8}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: {
                  xs: 'column',
                },
              }}
            >
              <Header>
                <CardContent sx={{ p: 0 }}>
                  <Box sx={{ display: 'flex', flexWarp: 'warp' }}>
                    <Image
                      src={
                        product.image ? product.image : product.product_image
                      }
                      alt={product.title}
                      width={100}
                      height={100}
                    />
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: { xs: 'column', md: 'colunm' },
                      }}
                    >
                      <Typography component="h6" variant="body1" sx={{ pt: 2 }}>
                        {product.title}
                      </Typography>

                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: { xs: 'column', md: 'row' },
                          justifyContent: 'space-between',
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: { xs: 'row', md: 'column' },
                          }}
                        >
                          <Typography variant="subtitle1" color="textSecondary">
                            விலை: <strong>₹{product.price} </strong>
                          </Typography>
                        </Box>
                        <TextField
                          id="Quantity"
                          label="எண்ணிக்கை"
                          name="quantity"
                          type="number"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        />
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Header>
              <CardContent>
                <Divider variant="middle" />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    mr: 2,
                    mt: 1,
                  }}
                >
                  <Typography variant="subtitle1" color="textSecondary">
                    <strong> மொத்த விலை: ₹ {product.price * quantity}</strong>
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            // margin: { sm: '16px 0', md: 2 },
            my: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          sapcing={2}
        >
          <Grid item xs={12} md={8}>
            <Card>
              <CardHeader title="தங்களது கோரிக்கை விவரங்களைப் பூர்த்தி செய்யவும்" />
              <CardContent>
                <FormBox>
                  {' '}
                  <FormControl
                    sx={{
                      display: 'flex',
                      flexDirection: { sm: 'column', md: 'row' },
                      gap: 1,
                    }}
                  >
                    <TextField
                      id="first-name"
                      label="பெயர்"
                      name="first_name"
                      variant="outlined"
                      required
                    />
                    <input
                      id="produt-id"
                      label="id"
                      name="product_id"
                      type="number"
                      value = {product.id}     
                      hidden     
                      readOnly          
                    />
                    <TextField
                      id="last-name"
                      label="இறுதிப் பெயர்"
                      name="last_name"
                      variant="outlined"
                      required
                    />
                  </FormControl>
                  <TextField
                    id="address"
                    label="முகவரி"
                    name="address"
                    multiline
                    rows={4}
                    variant="outlined"
                    required
                  />
                  <TextField
                    id="pincode"
                    label="அஞ்சல் குறியீட்டு எண்"
                    name="pincode"
                    type="number"
                    variant="outlined"
                    required
                  />
                  <TextField
                    id="phonenumber"
                    label="கைபேசி எண்"
                    name="phone_number"
                    type="number"
                    variant="outlined"
                    required
                  />
                  {extras &&
                    extras.map((extra) => (
                      <TextField
                        key={extra.id}
                        id={`${extra.id}-${extra.request}`}
                        label={extra.request}
                        name={extra.request}
                        type="text"
                        variant="outlined"
                        required
                      />
                    ))}
                  <Button
                    color="primary"
                    startIcon={<WhatsAppIcon />}
                    variant="contained"
                    type="submit"
                    size="medium"
                    sx={{
                      width: { xs: 'auto', md: '40%' },
                      mt: 1,
                    }}
                  >
                    {' '}
                    பொருளை வாங்க{' '}
                  </Button>
                </FormBox>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </RemixForm>
    </div>
  );
};

export default WAOrder;
