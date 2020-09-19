import React from 'react';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './routes/Routes';

import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// import { dark, light } from './theme';

import { useStyles } from './AppStyle';

function App() {
  const classes = useStyles();
  const darkMode = useSelector((state) => state.appUi.darkMode);

  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: red[500],
      },
    },
  });

  const lightTheme = createMuiTheme({
    palette: {
      primary: {
        main: red[500],
      },
    },
  });

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router>
        <Paper>
          <Loader />
          <Navbar />
          <Container className={classes.root}>
            <Routes />
          </Container>
          <Footer />
        </Paper>
      </Router>
    </ThemeProvider>
  );
}

export default App;
