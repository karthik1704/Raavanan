import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Link } from 'react-router-dom';

import { Styled } from '@mui/material/styles';

import { Helmet } from 'react-helmet';

const CenterBox = Styled(Box)((theme) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const PageNotFound = () => {
  return (
    <>
      <Helmet>
        <title>இராவணன் அங்காடி | Page 404</title>
      </Helmet>
      <CenterBox>
        <Typography variant="h2" component="div">
          Page 404{' '}
        </Typography>
        <Typography variant="body1">Page Not Found </Typography>
        <Button variant="outline" color="primary" component={Link} to="..">
          Go Back
        </Button>
      </CenterBox>
    </>
  );
};

export default PageNotFound;
