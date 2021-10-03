import { createSlice } from '@reduxjs/toolkit';

const initalState = {
  mode: 'light',
};

export const themeSlice = createSlice({
  name: 'theme',
  initalState,
  reducers: {
    changeTheme: (state, { payload }) => {
      state.mode = payload;
    },
  },
});

const { actions, reducer } = themeSlice;

export const { changeTheme } = actions;

export default reducer;
