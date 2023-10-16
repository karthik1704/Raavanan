import { Grid, Typography, Box } from '@mui/material';

export const meta = () => [
  { title: 'எங்களைப் பற்றி | இராவணன் அங்காடி' },
  {
    property: 'og:title',
    content: 'எங்களைப் பற்றி',
  },
  {
    name: 'description',
    content: `எங்களைத் தேர்ந்தெடுத்தமைக்கு மிக்க நன்றி ! உங்களது அன்பிற்கு நாங்கள்
    எப்மைப்பட்டுள்ளோம். பெரும் மகிழ்ச்சியுடன் உங்களை இராவணன்
    அங்காடிக்கு வரவேற்கிறோம்...`,
  },
  {
    tagName: "link",
    rel: "canonical",
    href: "https://raavananstore.com/about/",
  },
];

const About = () => {
  return (
    <Grid spacing={3} sx={{ p: 3 , display: 'flex', justifyContent:'center'}} container>
      <Grid item xs={12} md={10}>
        <Box sx={{my:1}}>
          <Typography component="h4" variant="h4">
            எங்களைப் பற்றி
          </Typography>
          <Typography component="h4" variant="h5">
            வணக்கம் !{' '}
          </Typography>
        </Box>
        <Box sx={{my:1}}>
          <Typography component="p" variant="body1">
            எங்களைத் தேர்ந்தெடுத்தமைக்கு மிக்க நன்றி ! உங்களது அன்பிற்கு நாங்கள்
            எப்போதும் கடமைப்பட்டுள்ளோம். பெரும் மகிழ்ச்சியுடன் உங்களை இராவணன்
            அங்காடிக்கு வரவேற்கிறோம்.
          </Typography>
        </Box>
        <Box sx={{my:1}}>
          <Typography component="h4" variant="h4">
            {' '}
            நாங்கள் யார் ?{' '}
          </Typography>
          <Typography component="p" variant="body1">
            இராவணன் அங்காடி என்பது இராவணன் குழுமத்தின் அங்காடி விற்பனைப் பிரிவு
            ஆகும். சங்கம் வைத்துத் தமிழ் வளர்த்த மாமதுரையில் தமது முதன்மைக்
            கிளையைக் கொண்டு செயலாற்றி வருகிறோம்.
          </Typography>
        </Box>{' '}
        <Box sx={{my:1}}>
          <Typography component="h4" variant="h4">
            எமது நோக்கம்
          </Typography>
          <Typography component="p" variant="body1">
            மிகச் சிறந்த ஒரு இணையதள அங்காடியை தமிழில் தமிழ்நாட்டில் உருவாக்கிக்
            காட்ட வேண்டும் என்பதே இராவணன் அங்காடியின் மேலான நோக்கம். இது ஒரு
            தமிழ்நாட்டுத் தயாரிப்பு என்று முழங்குவதில் நிகரற்ற பெருமை கொள்கிறது
            எமது குழு.
          </Typography>
        </Box>
        <Box sx={{my:1}}>
          <Typography component="h4" variant="h4">
            எமது செயல்{' '}
          </Typography>
          <Typography component="p" variant="body1">
            தமிழ்நாட்டுத் தயாரிப்பு என்ற எமது முத்திரையுடன் இராவணன்
            அங்காடியிலிருந்து அனைத்து பொருட்களும் தூதஞ்சல் இலவசமாக உங்களிடம்
            கூடிய விரைவில் வந்தடையும். 24 X 7 நேரமும் எமது வாடிக்கையாளர் சேவை
            மையத்தை நீங்கள் அணுக முடியும். சிறு துளி பெரு வெள்ளம் என்ற மேலான
            கருத்தின் அடிப்படையில் இன்றைய ஒரு பொருளின் சரியான விற்பனை நாளைய
            இலட்சம் பொருளின் விற்பனைக்கு அடிப்படை என்பதனை உணர்ந்து எமது குழு
            செயலாற்றுகிறது.
          </Typography>
        </Box>
        <Box sx={{my:1}}>
          <Typography component="h4" variant="h4">
            எமது குழு
          </Typography>
        </Box>
        <Box sx={{my:1}}>
          <Typography component="h4" variant="h4">
            இராவணன் அங்காடியில்
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default About;
