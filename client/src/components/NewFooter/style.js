import makeStyles from '@material-ui/styles/makeStyles';

// eslint-disable-next-line import/prefer-default-export
export const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100vw',
    [theme.breakpoints.down('md')]: {
      display: 'none',
      flexGrow: 1,
    },
    
  },
}));
