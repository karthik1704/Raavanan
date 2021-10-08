import { useEffect, useMemo } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from '@mui/material/styles';

import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes/Routes';

import { useSelector, useDispatch } from 'react-redux';

import useDarkTheme from './hooks/useDarkTheme';

import Loader from './components/Loader/Loader';
import Navbar from './components/navbar/Navbar';
import NewFooter from './components/NewFooter/NewFooter';

import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet';
import { store } from './data/store';
import Logo from './asserts/raavanan logo.png';
import axios from 'axios';
// import { toggleAppLoading } from './data/actions/appAction';
// import { logoutUser } from './data/actions/loginActions';

import { toggleLoader } from './features/loader/loaderSlice';
import { logoutUser } from './features/auth/authSlice';

import { getThemeByName } from './theme';

function App() {
  const [mode] = useDarkTheme();
  const { topLoader } = useSelector((state) => state.loader);
  const { dispatch } = useDispatch();

  const theme = useMemo(() => createTheme(getThemeByName(mode)), [mode]);

  // const { dispatch } = store;

  // useEffect(() => {

  //   axios.interceptors.request.use(
  //     function (config) {
  //       // spinning start to show
  //       dispatch(toggleLoader(true));
  //       //useTopLoader(true)
  //       return config;
  //     },
  //     function (error) {
  //       return Promise.reject(error);
  //     }
  //   );

  //   axios.interceptors.response.use(
  //     function (response) {
  //       // spinning hide
  //       // self.props.loading(false)

  //       dispatch(toggleLoader(false));
  //       return response;
  //     },
  //     function (error) {
  //       // if(!error.response)
  //       // return;
  //       if (error.response.status === 401) {
  //         localStorage.setItem('app_token', '');
  //         axios.defaults.headers.common['Authorization'] = '';
  //         dispatch(logoutUser(''));
  //         // Router.push('/');
  //         window.location.reload();
  //         return Promise.reject(error);
  //       }
  //       //   if(error.response.data.code == "token_not_valid"){

  //       //   localStorage.setItem("app_token", '');
  //       //   axios.defaults.headers.common['Authorization'] = '';
  //       //   //Promise.reject(error);
  //       // //   dispatch(logoutUser(''));
  //       // // <Redirect to="/" />

  //       //   //window.location.href = '/login'
  //       //   return Promise.reject(error);

  //       // }
  //       return Promise.reject(error);
  //     }
  //   );
  // }, []);

  useEffect(() => {
    ReactGA.initialize('G-LH9KB8TXPW');
    ReactGA.pageview(window.location.pathname + window.location.search);
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
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Router>
            <Paper>
              {topLoader && <Loader />}
              <Navbar />
              <Box
                sx={{
                  minHeight: {
                    sm: '100vh',
                    md: '53vh',
                  },
                }}
              >
                <Routes />
              </Box>
              <NewFooter />
            </Paper>
          </Router>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
}

export default App;
