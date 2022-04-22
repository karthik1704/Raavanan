import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, { payload }) => {
      state.cartItems.push(payload);
    },
    removeItem: (state, { payload }) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== payload);
    },
  },

  extraReducers: {},
});

const { actions, reducer } = cartSlice;
export const { addItem, removeItem } = actions;

export default reducer;
