import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import Header from '../../components/Header/Header';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: '#43a047',
//   },
//   form: {
//     width: '100%', // Fix IE 11 issue.
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
//   padding_bottom: {
//     paddingBottom: 10,
//   },
// }));

export default function Otpverification() {
  return (
    <>
      <Header title="Create Account" subtitle="Home" />

      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
            sx={{
              margin: 1,
              backgroundColor: '#43a047',
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            sx={{
              pb: '10px',
            }}
          >
            Otp Verification
          </Typography>
          <Typography component="p" variant="p">
            Enter the correct 6 digits number
          </Typography>
          <Box
            component="form"
            sx={{
              width: '100%', // Fix IE 11 issue.
              marginTop: 1,
            }}
            noValidate
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Otp"
              name="email"
              autoComplete="email"
              autoFocus
              className="Register_text"
              inputProps={{
                maxlength: 6,
                autocomplete: false,
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                m: (theme) => theme.spacing(3, 0, 2),
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
