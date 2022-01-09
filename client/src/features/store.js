import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';

// Slice Reducers imports
import authReducer from './auth/authSlice';
import appDrawerReducer from './appDrawer/appDrawerSlice';
import loaderReducer from './loader/loaderSlice';
import themeReducer from './theme/themeSlice';

// API Reducers imports
import { addressApi } from './address/addressApi';
import { authApi } from './auth/authApi';
import { orderApi } from './orders/orderApi';
import { productApi } from './product/productApi';

// in Future remove will be removed
import cartReducer from '../data/reducers/cartReducer';
import productReducer from '../data/reducers/productReducer';

import logger from 'redux-logger';

const store = configureStore({
  reducer: {
    //Add Slice Reducers here
    auth: authReducer,
    appDrawer: appDrawerReducer,
    loader: loaderReducer,
    theme: themeReducer,
    cart: cartReducer,
    products: productReducer,

    // Add API Reducers here
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [addressApi.reducerPath]: addressApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    // Add Api reducer middleware here
    getDefaultMiddleware().concat(
      logger,
      authApi.middleware,
      productApi.middleware,
      orderApi.middleware,
      addressApi.middleware
    ),
});

setupListeners(store.dispatch);

export default store;
