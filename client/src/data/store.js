// import { createStore, compose, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';

// import rootReducer from './reducers';

// const middlewares = [thunk];

// const store = createStore(
//   rootReducer,
//   compose(applyMiddleware(...middlewares))
// );

// export default store;

import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage: storage,
  //whitelist: ['login',] ,// which reducer want to store
  blacklist:['products']
};

const pReducer = persistReducer(persistConfig, rootReducer);
// const middleware = applyMiddleware(thunk, logger);
// const store = createStore(pReducer, middleware);


const store = createStore(pReducer, 
  applyMiddleware(thunk, logger),
  // other store enhancers if any
);



const persistor = persistStore(store);
export { persistor, store };
