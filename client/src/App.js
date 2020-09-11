import React from 'react';

import { ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import { useSelector } from 'react-redux';

import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import theme from './theme';
import { useStyles } from './AppStyle';

function App() {
  const classes = useStyles();
  const dark = useSelector((state) => state.appUi.darkMode);
  console.log(dark);
  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <Loader />
        <Navbar />
        <Container>
          <h1 className={classes.title}>இராவணன் கலைகூடம்</h1>
          <Button variant="contained" color="primary">
            Hi
          </Button>
        </Container>
        <Footer />
      </Paper>
    </ThemeProvider>
  );
}

export default App;
