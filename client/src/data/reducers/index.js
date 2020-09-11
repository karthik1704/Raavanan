import { combineReducers } from 'redux';

import appReducer from './appReducer';

const rootReducers = combineReducers({
  appUi: appReducer,
});

export default rootReducers;
