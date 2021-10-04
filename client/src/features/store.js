import { configureStore } from '@reduxjs/toolkit';

// Slice Reducers imports
import authReducer from './auth/authSlice';
import appDrawerReducer from './appDrawer/appDrawerSlice';
import themeReducer from './theme/themeSlice';

// API Reducers imports
import { authApi } from './auth/authApi';

const store = configureStore({
  reducer: {
    //Add Slice Reducers here
    auth: authReducer,
    appDrawer: appDrawerReducer,
    theme: themeReducer,

    // Add API Reducers here
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    // Add Api reducer middleware here
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
