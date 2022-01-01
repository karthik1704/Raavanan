import { useEffect } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from '@mui/material/styles';
import { green } from '@mui/material/colors';

import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes/Routes';

import { useSelector } from 'react-redux';

import useDarkTheme from './hooks/useDarkTheme';

import Loader from './components/Loader/Loader';
import Navbar from './components/navbar/Navbar';
import NewFooter from './components/NewFooter/NewFooter';
// import { dark, light } from './theme';
import { withRouter } from "react-router";
import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet';
import { store } from './data/store';
import Logo from './asserts/raavanan logo.png';



ReactGA.initialize('G-783HZEMX30');

function App() {
  const [theme] = useDarkTheme();
  const { loading } = useSelector((state) => state.appUi);
  //const { dispatch } = useDispatch();
  const { dispatch } = store;
  // const myhistory = createHistory();
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const lightTheme = createTheme({
    palette: {
      primary: {
        main: green[600],
        // main: '#8bc34a'
      },
    },
  });
  
  // useEffect(() => {
  //   // console.log('app.js')
  //   // ReactGA.initialize('G-LH9KB8TXPW');
  //   // ReactGA.pageview(window.location.pathname + window.location.search);
  // }, []);

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
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
          <Router>
            <Paper>
              {loading && <Loader />}
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
