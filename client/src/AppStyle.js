import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '53vh',
    [theme.breakpoints.down('md')]: {
      minHeight: '100vh',
    },
  },
}));
