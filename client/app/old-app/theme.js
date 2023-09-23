import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const dark = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: red[500],
    },
  },
});

export const light = createTheme({});
