import LinearProgress from '@material-ui/core/LinearProgress';
import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 1000,
    //position: 'fixed',
  },
}));

const Loader = () => {
  const classes = useStyles();
  return <LinearProgress className={classes.root} color="secondary" />;
};

export default Loader;
