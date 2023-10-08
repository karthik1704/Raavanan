import {  useEffect } from 'react';
import {
  useLoaderData,
  Link as RemixLink
} from '@remix-run/react';

import {
    Box,
  Button,
  Card,
  CardContent,
  Grid,
  Link,
  Typography,
} from '@mui/material';

import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import { API_URL } from '~/config';
import { json,  } from '@remix-run/node';

export const loader = async ({ params }) => {
  const res = await fetch(`${API_URL}/api/waorder/${params.id}/`, {
    headers: { connection: 'keep-alive' },
  });

  const order = await res.json();

  return json({ order });
};

const Index = (props) => {
  const { order } = useLoaderData();

  useEffect(() => {
    console.log(order);
    if (order) sendMessage();
  }, [order]);

  const sendMessage = () => {
    const extras = !order.extra_info.length
      ? null
      : order.extra_info
          .map((obj) => ({ [obj.question]: obj.answer }))
          .map((obj) => {
            return Object.entries(obj)
              .map(([key, value]) => `${key}: ${value}`)
              .join('\n');
          });

    console.log(extras);

    const extra_information = extras
      ? `
Extra Information
================
${extras.join('\n')}

    `
      : null;

    const waMessage = `
கோரிக்கை
=========
தயாரிப்பு எண்: ${order.product_id.variant_id},
பொருளின் பெயர்: ${order.product_id.title},
விலை: '₹' ${order.product_id.price}
எண்ணிக்கை: ${order.quantity},
மொத்த விலை: ₹.${order.price * order.quantity}, 


வாடிக்கையாளர் தகவல்
=======================
பெயர்: ${order.first_name} ${order.last_name},\n
முகவரி: \n${order.address},
அஞ்சல் குறியீடு: ${order.pincode},\n
கைபேசி எண்: ${order.phone_number}.\n
  

${extra_information}.\n

`;

    const encodeMessage = encodeURIComponent(waMessage);

    console.log(waMessage);
    console.log(encodeMessage);

    const WALINK = `https://wa.me/917871003935/?text=${encodeMessage}`;
    if (window) window.open(WALINK);
  };

  return (
    <div>
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
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <CardContent sx={{textAlign:'center'}}>
              <Typography variant="h4">
                Your order received! - {order?.order_id}
              </Typography>
              <Typography variant="body1">
                We will contact you very soon!, for further information and
                payment.
              </Typography>
              <Typography variant="body1">
                You can't wait... feel free to contact us by clicking below
                button
              </Typography>
              <Box sx={{mt:2, display:'flex', flexDirection:'column', gap:2}}>

              <Button
                color="primary"
                startIcon={<WhatsAppIcon />}
                variant="contained"
                size="medium"
                onClick={sendMessage}
                >
                Send Whats app Message
              </Button>
              <RemixLink
                to='/'
                >
                Return Home
              </RemixLink>
                  </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Index;
