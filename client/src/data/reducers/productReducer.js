import { FETCH_PRODUCT_DETAIL, FETCH_PRODUCT } from '../CONSTANTS';

const initalState = {
  products: [],
  productDetail: {},
};

const productReducer = (state = initalState, { type, payload }) => {
  switch (type) {
    case FETCH_PRODUCT:
      return {
        ...state,
        products: payload,
      };
    case FETCH_PRODUCT_DETAIL:
      return {
        ...state,
        productDetail: payload,
      };

    default:
      return state;
  }
};

export default productReducer;
