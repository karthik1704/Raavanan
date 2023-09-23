import { useEffect } from 'react';

import {Box, Paper} from '@mui/material';
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from '@mui/material/styles';
import { green } from '@mui/material/colors';

import Routes from './routes/Routes';

import { useSelector , Provider} from 'react-redux';

import useDarkTheme from './hooks/useDarkTheme';

import Loader from './components/Loader/Loader';
import Navbar from './components/navbar/Navbar';
import NewFooter from './components/NewFooter/NewFooter';
// import { dark, light } from './theme';
import ReactGA from 'react-ga4';
import store from './data/store';

import { Helmet } from 'react-helmet';
import Logo from './asserts/raavanan logo.png';


function Layout() {
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
         

    </>
  );
}

export default Layout;
