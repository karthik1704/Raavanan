import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 238,
    margin: theme.spacing(0.5),
    // [theme.breakpoints.down('sm')]: {
    //   maxWidth: 140,
    // },
    // [theme.breakpoints.up('sm')]: {
    //   minWidth: 180,
    // },
  },
  media: {
    marginTop: '5px',
    paddingTop: 10,
    paddingRight: 10,
    [theme.breakpoints.down('sm')]: {
      width: 150,
      height: 150,
    },
    width: 200,
    height: 200,
  },
  frameImage: {
    marginTop: '5px',
    paddingTop: 10,
    paddingRight: 10,
    [theme.breakpoints.down('sm')]: {
      width: 150,
      height: 150,
    },
    width: 200,
    height: 200,
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
  },
  content: {
    padding: '0.5rem auto',
  },
  title: {
    textAlign: 'center',
    fontSize: '12px',
    marginBottom: '1px',
    fontWeight: 'bold',

    [theme.breakpoints.down('sm')]: {
      fontSize: '0.6rem',
      fontWeight: 600,
    },
  },
  price: {
    textAlign: 'center',
    fontWeight: 500,
    fontSize: '13px',
  },
  cardButtons: {
    display: 'flex',
    justifyContent: 'center',
  },
  cartBtn: {
    color: 'white',
    background: '#43a047',
    paddingLeft: '10px',
    fontSize: '10px',
  },
  shapeCircle: {
    borderRadius: '50%',
    left: '6%',
    display: 'contents',
  },
  mrp: {
    textDecoration: 'line-through',
    fontSize: '11px',
    // fontWeight: '300'
  },
}));
