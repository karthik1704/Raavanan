import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import axois from 'axios';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

import { API_URL } from '../../CONSTANTS';
import { Message } from '@material-ui/icons';

const WAOrder = () => {
  const [message, setMessage] = useState({});
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axois
      .get(`${API_URL}api/product/${id}`)
      .then((res) => setProduct(res.data));
  }, [id]);

  const handleChange = (e) => {
    setMessage({
      ...message,
      [e.target.name]: e.target.value,
    });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const waMessage = `
ORDER
====
தயாரிப்பு எண்: ${id},
பொருளின் பெயர்: ${product.product_name},
விலை: ${product.price}

Customer Information
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

  return (
    <div>
      <form onSubmit={sendMessage}>
        <div>
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
        </div>
        <div>
          <TextField
            id="extra"
            label="Mobile Model Name"
            name="mobile"
            variant="outlined"
            onChange={handleChange}
          />
        </div>
        <TextField
          id="address"
          label="Address"
          name="address"
          multiline
          rowsMax={4}
          variant="outlined"
          //   value={value}
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
    </div>
  );
};

export default WAOrder;
