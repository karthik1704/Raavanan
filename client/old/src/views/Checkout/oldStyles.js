import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      margin: '16px 0',
    },
  },
  card: {
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
    // [theme.breakpoints.up('md')]: {
    //   flexDirection: 'row',
    // },
  },
  header: {
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
    },
  },
  center: {
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  image: {
    height: 115,
    width: 60,
    [theme.breakpoints.down('md')]: {
      width: 50,
    },
  },
  grow: {
    flex: 1,
  },
  margin: {
    margin: theme.spacing(1),
  },
  orderForm: {
    display: 'flex',
    flexDirection: 'column',

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
      [theme.breakpoints.down('md')]: {
        width: 'auto',
      },
    },
  },
  nameForm: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  btnSize: {
    width: '40%',
    [theme.breakpoints.down('md')]: {
      width: 'auto',
    },
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));
