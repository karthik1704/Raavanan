import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

export const dark = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: red[500],
    },
  },
});

export const light = createMuiTheme({});
