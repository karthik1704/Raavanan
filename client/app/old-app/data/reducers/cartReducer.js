import CartActionTypes from '../../views/Cartpage/cart.types';
import { addItemToCart, removeItemFromCart, addOtherInfo } from '../../views/Cartpage/cart.utils';


const INITIAL_STATE = {
 // hidden: true,
  cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {  
  switch (action.type) {
    
    case CartActionTypes.ADD_ITEM:         
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload)
      };
    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload)
      };
    case CartActionTypes.CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: []
      };
      case CartActionTypes.ADD_OTHER_INFO:        
      return {
        ...state,
        cartItems: addOtherInfo(state.cartItems, action.payload)
      };
      
    default:
      return state;
  }
};
// state.cartItems.filter(
//   cartItem => cartItem.id !== action.payload.id
// )

export default cartReducer;
