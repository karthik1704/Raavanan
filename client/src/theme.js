import { createTheme, adaptV4Theme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

export const dark = createTheme(adaptV4Theme({
  palette: {
    mode: 'dark',
    primary: {
      main: red[500],
    },
  },
}));

export const light = createTheme(adaptV4Theme({}));
