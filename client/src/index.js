import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Switch, Route, BrowserRouter,Redirect } from 'react-router-dom';


import { Provider } from 'react-redux';
import {store, persistor} from './data/store';
import { PersistGate } from 'redux-persist/integration/react';
import axios from 'axios';
import ReactGA from 'react-ga';
import { logoutUser } from './data/actions/loginActions';

import App from './App';
import * as serviceWorker from './serviceWorker';
const {dispatch} = store;
ReactGA.initialize('G-LH9KB8TXPW');
axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');

// axios.interceptors.response.use((response) => {
//  // console.log(response)
//   //return response;
//   return response
// }, (error) => {
  
//   if(error.response.data.code == "token_not_valid"){
    
//      localStorage.setItem("app_token", '');
//      axios.defaults.headers.common['Authorization'] = '';
//     //Promise.reject(error);
//     dispatch(logoutUser(''));
//    //<Redirect to="/" />
   
//       //return window.location.href = '/login'
//     return Promise.reject(error);
    
    
//   }
  
//   return Promise.reject(error.message);
// });

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
