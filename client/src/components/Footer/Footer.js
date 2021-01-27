import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { useStyles } from './style';

const Footer = () => {
  const classes = useStyles();
  return (
    <footer  className={classes.root}>
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
            &copy; இராவணன் மிண்ணனுப் பிரிவு
          </Typography>
        </Box>
      </Paper>
    </footer>
  );
};

export default Footer;
