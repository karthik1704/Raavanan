import { createSlice } from '@reduxjs/toolkit';

import { authApi } from './authApi';

const initialState = {
  isAuthenticated: false,
  access_token: null,
  refresh_token: null,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, { payload }) => {
      state.isAuthenticated = payload.isAuthenticated;
      state.access_token = payload.access_token;
      state.refresh_token = payload.refresh_token;
      state.user = payload.user;
    },
    logoutUser: (state, action) => {
      state.isAuthenticated = false;
      state.access_token = null;
      state.refresh_token = null;
      state.user = null;

      // Remove Tokens From LocalStorage
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.isAuthenticated = true;
        state.access_token = payload.access_token;
        state.refresh_token = payload.refresh_token;
        state.user = payload.user;

        // Store in Local Storage
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('access_token', payload.access_token);
        localStorage.setItem('refresh_token', payload.refresh_token);
      }
    );
    builder.addMatcher(
      authApi.endpoints.register.matchFulfilled,
      (state, { payload }) => {
        state.isAuthenticated = true;
        state.access_token = payload.access_token;
        state.refresh_token = payload.refresh_token;
        state.user = payload.user;

        // Store in Local Storage
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('access_token', payload.access_token);
        localStorage.setItem('refresh_token', payload.refresh_token);
      }
    );
  },
});

const { actions, reducer } = authSlice;

export const { loginUser, logoutUser } = actions;

export default reducer;
