import { green } from '@mui/material/colors';

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    // Light Theme
    ...(mode === 'light' && {
      primary: {
        //...green,
        main: green[600],
        // main: '#8bc34a'
      },
    }),
    // Dark Theme
  },
});
