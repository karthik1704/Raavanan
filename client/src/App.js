import { useMemo } from 'react';
import { Paper } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { HelmetProvider } from 'react-helmet-async';

import AppRoutes from 'routes/app-routes';
import { getDesignTokens } from 'features/theme/theme';
import './App.css';

function App() {
  const theme = useMemo(() => createTheme(getDesignTokens('light')), []);
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <Paper square className="app">
          <AppRoutes />
        </Paper>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
