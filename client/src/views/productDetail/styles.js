import { makeStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

const useStyles = makeStyles((theme) => ({
  loading: {
    display: 'flex',
    justifyContent: 'conter',
    alignItems: 'center',
  },
  root: {
    margin: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      margin: '16px 0',
    },
  },
  productImage: {
    width: 300,
    height: 600,
  },
  frameImage: {
    width: 400,
    height: 550,
  },
  buttons: {
    margin: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  whatsappBtn: {
    margin: theme.spacing(1),
    backgroundColor: green[500],
  },
}));

export default useStyles;
