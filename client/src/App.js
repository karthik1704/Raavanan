import { useEffect, useMemo } from 'react';

import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

import { useSelector } from 'react-redux';

import useDarkTheme from './hooks/useDarkTheme';
import Loader from './components/Loader/Loader';

import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet';
import store from './features/store';
import Logo from './asserts/raavanan logo.png';
import axios from 'axios';
// import { toggleAppLoading } from './data/actions/appAction';
// import { logoutUser } from './data/actions/loginActions';

import { toggleLoader } from './features/loader/loaderSlice';
import { logoutUser } from './features/auth/authSlice';

import { getDesignTokens } from './theme/theme';

function App() {
  const [mode] = useDarkTheme();
  const { topLoader } = useSelector((state) => state.loader);
  const { dispatch } = store;

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  // const { dispatch } = store;

  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: window.location.pathname + window.location.search,
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>இராவணன் அங்காடி | முகப்பு</title>
        <meta
          name="keywords"
          content="ravanan,raavanan, ravanan store, raavanan store, phone case,photo frame,mugs,cups,stickers,tamil Dhesiyam, ntk, naam tzhamilar, seeman,valluvar, raavananstore "
        />
        <meta property="og:title" content="Raavanan Store , இராவணன் அங்காடி" />
        <meta property="og:image" content={Logo} />
        <meta
          property="og:description"
          content="Raavanan Store , இராவணன் அங்காடி"
        />
      </Helmet>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Paper component="main">
            {topLoader && <Loader />}
            <AppRoutes />
          </Paper>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
