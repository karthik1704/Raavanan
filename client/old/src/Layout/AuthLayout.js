import Box from '@mui/material/Box';

import { Link, Outlet } from 'react-router-dom';

import RavananLogo from '../asserts/raavanan logo png.png';

const AuthLayout = () => {
  return (
    <Box
      sx={{
        minHeight: {
          sm: '100vh',
        },
      }}
    >
      <Box sx={{ backgroundColor: '#000', width: 142, mt: 1, ml: 1 }}>
        <Link to="/">
          <img src={RavananLogo} alt="logo" height="40" width="140px" />
        </Link>
      </Box>

      <Outlet />
    </Box>
  );
};

export default AuthLayout;
