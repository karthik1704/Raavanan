import {CssBaseline, Container, Grid} from '@mui/material';

export default function FixedContainer() {
  return (
    <>
      <CssBaseline />
      <div className="Footer_Wrap">
        <Container fixed>
         
          <div>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4} xl={4} md={4}>
                <div className="Footer_First_block">
                  <h5 className="first_block_title">எங்களைப் பற்றி</h5>
                  <p className="first_block_description">
                    சங்கம் வைத்து தமிழ் வளர்த்த மாமதுரையில் தமது முதன்மைக்
                    கிளையைக் கொண்டு செயலாற்றி வருகிறது.மிகச் சிறந்த ஒரு இணையதள
                    அங்காடியை தமிழில் தமிழகத்தில் உருவாக்கிக் காட்டவேண்டும்
                    என்பதே இராவணன் அங்காடியின் மேலான நோக்கம். இது ஒரு
                    தமிழ்நாட்டுத் தயாரிப்பு என்று முழங்குவதில் நிகரற்ற பெருமை
                    கொள்கிறது எமது குழு.
                  </p>
                </div>
              </Grid>

              <Grid item xs={12} sm={4} xl={4} md={4}>
                <div className="Footer_First_block">
                  <h5 className="first_block_title">Contacts</h5>
                  <ul className="first_block_list">
                    <li>தொலைபேசி/பகிரி : +91-7871003935</li>
                    <li> மின்னஞ்சல் : care@raavananstore.com</li>
                  </ul>
                </div>
              </Grid>
              <Grid item xs={12} sm={4} xl={4} md={4}>
                <div className="Footer_First_block">
                  <h5 className="first_block_title">Subscribe</h5>
                  <p className="first_block_description">
                    எந்த ஒரு சமூக வலைத்தளங்களிலும் இராவணன் அங்காடியின்
                    பக்கங்களில் குறுஞ்செய்தி அனுப்பியும் தொடர்பு கொள்ளலாம்.
                  </p>
                </div>
              </Grid>

              {/* <Grid item xs={12} sm={2} xl={2} md={2}>
     <div className="Footer_First_block">
       <h5 className="first_block_title">About</h5>

       <ul className="first_block_list">
         <li>Home</li>
         <li>About</li>
         <li>Contact</li>
         <li>Home</li>
       </ul>
      
     </div>
        </Grid> */}

              <Grid item xs={12} sm={12} xl={12} md={12}>
                <div className="Footer_copywrites">
                  <p className="footer_copy_title">
                    Copyright © 2021 Raavanan. All Rights Reserved
                  </p>
                </div>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    </>
  );
}
