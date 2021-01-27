import {
  REGISTER
 
} from '../CONSTANTS';

const initalState = {
  user: {},
  // productDetail: {},
};

const registerReducer = (state = initalState, { type, payload }) => {
  switch (type) {
    case REGISTER:
      return {
        ...state,
        products: [...state.user, ...payload],
      };
    // case FETCH_PRODUCT_DETAIL:
    //   return {
    //     ...state,
    //     productDetail: payload,
    //   };

    // case RESET_PRODUCT:
    //   return {
    //     ...state,
    //     products: payload,
    //   };

    default:
      return state;
  }
};

export default registerReducer;
