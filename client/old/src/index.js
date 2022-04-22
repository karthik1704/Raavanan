import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
// import { store, persistor } from './data/store';
import store from './features/store';
import { PersistGate } from 'redux-persist/integration/react';
import ReactGA from 'react-ga4';

import App from './App';
import * as serviceWorker from './serviceWorker';

import './index.css';

ReactGA.initialize('G-783HZEMX30');

// React 18
const containerRoot = document.getElementById('root');

if (!containerRoot) throw new Error('Could not found the root element');

const root = ReactDOM.createRoot(containerRoot);

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
