import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes/Routes';

import { useSelector } from 'react-redux';

import useDarkTheme from './hooks/useDarkTheme';

import Loader from './components/Loader/Loader';
import Navbar from './components/navbar/Navbar';
import Footer from './components/Footer/Footer';

// import { dark, light } from './theme';

import { useStyles } from './AppStyle';

function App() {
  const classes = useStyles();
  const [theme] = useDarkTheme();
  const { loading } = useSelector((state) => state.appUi);

  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

  const lightTheme = createMuiTheme({
    palette: {
      primary: {
        main: green[600],
      },
    },
  });

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <Router>
        <Paper>
          {loading && <Loader />}
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
