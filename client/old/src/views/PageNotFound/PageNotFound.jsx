import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { styled } from '@mui/material/styles';

const CenterBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
}));

const PageNotFound = () => {
  return (
    <>
      <Helmet>
        <title>இராவணன் அங்காடி | Page 404</title>
      </Helmet>
      <CenterBox>
        <Typography variant="h2" component="div">
          Oops! | Page 404{' '}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mt: 2,
          }}
        >
          We can&rsquo;t find a Page you looking for :({' '}
        </Typography>
        <Button
          sx={{
            mt: 2,
          }}
          variant="outlined"
          color="primary"
          startIcon={<ArrowBackIcon />}
          component={Link}
          to=".."
        >
          Go Back
        </Button>
      </CenterBox>
    </>
  );
};

export default PageNotFound;
