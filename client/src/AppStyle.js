import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '53vh',
    [theme.breakpoints.up('sm')]: {
      minHeight: '100vh',
    },
  },
}));
