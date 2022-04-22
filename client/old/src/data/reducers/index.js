import { combineReducers } from 'redux';

import appReducer from './appReducer';
import productReducer from './productReducer';
import loginReducer from './loginReducer';
import cartReducer from './cartReducer';

const rootReducers = combineReducers({
  appUi: appReducer,
  products: productReducer,  
  login: loginReducer,
  cart : cartReducer,
});

export default rootReducers;
