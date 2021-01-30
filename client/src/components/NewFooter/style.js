import { makeStyles } from '@material-ui/core/styles';

// eslint-disable-next-line import/prefer-default-export
export const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100vw',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
      flexGrow: 1,
    },
    
  },
}));
