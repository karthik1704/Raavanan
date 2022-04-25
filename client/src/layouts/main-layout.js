import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Navbar from 'components/navbar/navbar';

const MainLayout = () => {
  return (
    <Fragment>
      <Navbar />
      <Container>
        <Box sx={{ my: 2 }}>
          <Outlet />
        </Box>
      </Container>
    </Fragment>
  );
};

export default MainLayout;
