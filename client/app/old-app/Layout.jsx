import { Box, Paper } from '@mui/material';
import Routes from './routes/Routes';

function Layout() {
  return (
    <>
      <Paper>
        <Box
          sx={{
            minHeight: {
              sm: '100vh',
              md: '53vh',
            },
          }}
        >
          <Routes />
        </Box>
      </Paper>
    </>
  );
}

export default Layout;
