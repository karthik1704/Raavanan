import makeStyles from '@material-ui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '53vh',
    [theme.breakpoints.down('md')]: {
      minHeight: '100vh',
    },
  },
}));
