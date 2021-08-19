import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { styled } from '@material-ui/core/styles';

const Root = styled('footer')(({ theme }) => ({
  maxWidth: '100vw',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const Footer = () => (
  <Root>
    <Paper elevation={3}>
      <Box display="flex" justifycontent="center">
        <Toolbar>
          <Button>எங்களைத் தெரிந்து கெள்ளுங்கள்</Button>
          <Button>எங்களுடன் இணைந்திருங்கள்</Button>
          <Button>உங்களுக்கு உதவ</Button>
        </Toolbar>
      </Box>
      <Box display="flex" justifycontent="center">
        <Typography variant="caption" display="block" gutterBottom>
          &copy; இராவணன் மிண்ணனுப் பிரிவு
        </Typography>
      </Box>
    </Paper>
  </Root>
);

export default Footer;
