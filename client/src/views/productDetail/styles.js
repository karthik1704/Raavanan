import { makeStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

const useStyles = makeStyles((theme) => ({
  productImage: {
    width: 300,
    height: 600,
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
