import { createTheme, adaptV4Theme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const dark = createTheme(adaptV4Theme({
  palette: {
    mode: 'dark',
    primary: {
      main: red[500],
    },
  },
}));

export const light = createTheme(adaptV4Theme({}));
