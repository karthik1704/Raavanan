import { combineReducers } from 'redux';

import appReducer from './appReducer';
import productReducer from './productReducer';

const rootReducers = combineReducers({
  appUi: appReducer,
  products: productReducer,
});

export default rootReducers;
