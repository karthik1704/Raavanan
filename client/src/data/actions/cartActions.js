import CartActionTypes from '../../views/Cartpage/cart.types';

export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN
});

export const addItem = item => ({  
  type: CartActionTypes.ADD_ITEM,
  payload: item
});

export const addOtherInfo = item => ({    
  type: CartActionTypes.ADD_OTHER_INFO,
  payload: item
});

export const removeItem = item => ({
  type: CartActionTypes.REMOVE_ITEM,
  payload: item
});

export const clearItemFromCart = item => ({
  type: CartActionTypes.CLEAR_ITEM_FROM_CART,
  payload: item
});
