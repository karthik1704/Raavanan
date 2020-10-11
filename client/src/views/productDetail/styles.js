import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  productImage: {
    width: 400,
    height: 600,
  },
  buttons: {
    margin: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-evenly',
  },
}));

export default useStyles;
