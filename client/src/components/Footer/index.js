import React from 'react';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Footer = () => {
  return (
    <footer mt={2}>
      <Paper elevation={3}>
        <Box display="flex" justifyContent="center">
          <Toolbar>
            <Button>எங்களைத் தெரிந்து கெள்ளுங்கள்</Button>
            <Button>எங்களுடன் இணைந்திருங்கள்</Button>
            <Button>உங்களுக்கு உதவ</Button>
          </Toolbar>
        </Box>
        <Box display="flex" justifyContent="center">
          <Typography variant="caption" display="block" gutterBottom>
            &copy; Raavaanan Digital Media
          </Typography>
        </Box>
      </Paper>
    </footer>
  );
};

export default Footer;
