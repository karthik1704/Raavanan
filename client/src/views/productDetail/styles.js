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
    paddingTop: 6,
    width: 500,
    height: 500,
    [theme.breakpoints.down('sm')]: {
      width: 300,
      height: 300,
    },
  },
  center:{
    display: 'flex',
    justifyContent: 'conter',
    
  },
  frameImage: {
    paddingTop: 6,
    width: 500,
    height: 500,
    [theme.breakpoints.down('sm')]: {
      width: 300,
      height: 300,
    },
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
  title: {
    fontWeight : 600,
  }
  
}));

export default useStyles;
