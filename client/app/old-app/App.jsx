import { useEffect } from 'react';

import {Box, Paper} from '@mui/material';
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from '@mui/material/styles';
import { green } from '@mui/material/colors';

import { BrowserRouter as Router } from 'react-router-dom';
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
import Layout from '~/old-app/Layout';

function App() {
 
  return (
   
      <Provider store={store}>
        
      <Layout />
      </Provider>

    
  );
}

export default App;
