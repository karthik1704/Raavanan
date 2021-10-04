import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  drawerOpen: false,
};

export const appDrawerSlice = createSlice({
  name: 'appDrawer',
  initialState,
  reducers: {
    toggleDrawer: (state, { payload }) => {
      state.drawerOpen = payload;
    },
  },
});

const { actions, reducer } = appDrawerSlice;

export const { toggleDrawer } = actions;

export default reducer;
