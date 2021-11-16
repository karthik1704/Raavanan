import { configureStore } from '@reduxjs/toolkit';

// Slice Reducers imports
import authReducer from './auth/authSlice';
import appDrawerReducer from './appDrawer/appDrawerSlice';
import loaderReducer from './loader/loaderSlice';
import themeReducer from './theme/themeSlice';

// API Reducers imports
import { authApi } from './auth/authApi';
import { productApi } from './product/productApi';

// in Future remove will be removed
import cartReducer from '../data/reducers/cartReducer';

import logger from 'redux-logger';
import { orderApi } from './orders/orderApi';

const store = configureStore({
  reducer: {
    //Add Slice Reducers here
    auth: authReducer,
    appDrawer: appDrawerReducer,
    loader: loaderReducer,
    theme: themeReducer,
    cart: cartReducer,

    // Add API Reducers here
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    // Add Api reducer middleware here
    getDefaultMiddleware().concat(
      logger,
      authApi.middleware,
      productApi.middleware,
      orderApi.middleware
    ),
});

export default store;
