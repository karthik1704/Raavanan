import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
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
  );
};

export default AuthLayout;
