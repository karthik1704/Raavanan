import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { store, persistor } from './data/store';
import { PersistGate } from 'redux-persist/integration/react';
import axios from 'axios';
import ReactGA from 'react-ga';

import App from './App';
import * as serviceWorker from './serviceWorker';

import './index.css';

ReactGA.initialize('G-LH9KB8TXPW');
axios.defaults.headers.common['Authorization'] = localStorage.getItem(
  'app_token'
);

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
