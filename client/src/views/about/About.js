import { useEffect } from 'react';

import useTopLoader from '../../hooks/useTopLoader';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const About = () => {
  const [, onToggleTopLoader] = useTopLoader();

  useEffect(() => {
    onToggleTopLoader(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid spacing={3} sx={{ p: 3 }}>
      <Grid item xs={12}>
        <Typography component="h4" variant="h6">
          எங்களைப் பற்றி
        </Typography>
        <Typography component="p" variant="body1">
          வணக்கம் !{' '}
        </Typography>
        <Typography component="p" variant="body1">
          எங்களைத் தேர்ந்தெடுத்தமைக்கு மிக்க நன்றி ! உங்களது அன்பிற்கு நாங்கள்
          எப்போதும் கடமைப்பட்டுள்ளோம். பெரும் மகிழ்ச்சியுடன் உங்களை இராவணன்
          அங்காடிக்கு வரவேற்கிறோம் இராவணன் அங்காடி என்பது இராவணன் குழுமத்தின்
          அங்காடி விற்பனைப் பிரிவு ஆகும். சங்கம் வைத்துத் தமிழ் வளர்த்த
          மாமதுரையில் தமது முதன்மைக் கிளையைக் கொண்டு செயலாற்றி வருகிறது.மிகச்
          சிறந்த ஒரு இணையதள அங்காடியை தமிழில் தமிழகத்தில் உருவாக்கிக்
          காட்டவேண்டும் என்பதே இராவணன் அங்காடியின் மேலான நோக்கம். இது ஒரு
          தமிழ்நாட்டுத் தயாரிப்பு என்று முழங்குவதில் நிகரற்ற பெருமை கொள்கிறது
          எமது குழு.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default About;
