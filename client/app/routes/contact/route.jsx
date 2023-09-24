import {Box} from '@mui/material';


const Contact = () => {

 

  return (
    <Box sx={{ p: 3 }}>
      <h4>தொடர்புக்கு :</h4>
      <p>
        வணக்கம் ! இன்பத் தமிழ் நம் உயிருக்கு நேர் !<br />
        இராவணன் அங்காடியைத் தொடர்பு கொள்ள கீழ்காணும் இணைப்புகளைப்
        பயன்படுத்தவும்.
      </p>

      <p>வாடிக்கையாளர் பிரிவு தொடர்புக்கு :</p>
      <address>
        தொலைபேசி/பகிரி : <strong>+91-7871003935</strong> <br />
        மின்னஞ்சல் :{' '}
        <a href="mailto:care@raavananstore.com">
          <strong>care@raavananstore.com</strong>
        </a>
      </address>
      <p>
        மற்றபடி எந்த ஒரு சமூக வலைத்தலங்களிலும் இராவணன் அங்காடியின் பக்கங்களில்
        குறுஞ்செய்தி அனுப்பியும் தொடர்பு கொள்ளலாம்.{' '}
      </p>
    </Box>
  );
};

export default Contact;
