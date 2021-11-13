import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';

import Navbar from '../components/navbar/Navbar';
import NewFooter from '../components/NewFooter/NewFooter';

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: {
            sm: '100vh',
            md: '53vh',
          },
        }}
      >
        <Outlet />
      </Box>
      <NewFooter />
    </>
  );
};

export default AppLayout;
