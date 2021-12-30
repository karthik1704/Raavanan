import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './features/store';
// import { store, persistor } from './data/store';
// import { PersistGate } from 'redux-persist/integration/react';
// import axios from 'axios';
import ReactGA from 'react-ga4';

import App from './App';
import * as serviceWorker from './serviceWorker';

import './index.css';

// Temp fix , bug caused by cra v5 --> fix in 5.0.1 relese
window.process = {};

ReactGA.initialize('G-783HZEMX30');
// axios.defaults.headers.common['Authorization'] = localStorage.getItem(
//   'app_token'
// );

// React 18
const container = document.getElementById('root');

if (!container) throw new Error('Could not found the root element');

const root = ReactDOM.createRoot(container);

// root.render(
//   <StrictMode>
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <App />
//       </PersistGate>
//     </Provider>
//   </StrictMode>
// );

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
