import {
  FETCH_PRODUCT_DETAIL,
  FETCH_PRODUCT,
  RESET_PRODUCT,
} from '../CONSTANTS';

const initalState = {
  products: [],
  productDetail: {},
};

const productReducer = (state = initalState, { type, payload }) => {
  switch (type) {
    case FETCH_PRODUCT:
      return {
        ...state,
        products: [...state.products, ...payload],
      };
    case FETCH_PRODUCT_DETAIL:
      return {
        ...state,
        productDetail: payload,
      };

    case RESET_PRODUCT:
      return {
        ...state,
        products: payload,
      };

    default:
      return state;
  }
};

export default productReducer;
