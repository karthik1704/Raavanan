import { FETCH_PRODUCT_DETAIL, FETCH_PRODUCT } from '../CONSTANTS';

// eslint-disable-next-line import/prefer-default-export

export const fetchProduct = (payload) => {
  return {
    type: FETCH_PRODUCT,
    payload,
  };
};

export const fetchProductDetail = (payload) => {
  return {
    type: FETCH_PRODUCT_DETAIL,
    payload,
  };
};
