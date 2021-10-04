import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'light',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: (state, { payload }) => {
      state.mode = payload;
    },
  },
});

const { actions, reducer } = themeSlice;

export const { changeTheme } = actions;

export default reducer;
