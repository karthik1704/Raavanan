import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  topLoader: false,
};

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    toggleLoader: (state, { payload }) => {
      state.topLoader = payload;
    },
  },
});

const { actions, reducer } = loaderSlice;

export const { toggleLoader } = actions;

export default reducer;
