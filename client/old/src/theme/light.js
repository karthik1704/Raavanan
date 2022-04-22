import { createTheme } from '@mui/material/styles';

import { green } from '@mui/material/colors';

const light = createTheme({
  palette: {
    primary: {
      main: green[600],
      // main: '#8bc34a'
    },
  },
});

export default light;
