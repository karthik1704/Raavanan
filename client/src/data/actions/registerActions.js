import {
  
  REGISTER,
} from '../CONSTANTS';

// eslint-disable-next-line import/prefer-default-export

export const registerUser = (payload) => {
  return {
    type: REGISTER,
    payload,
  };
};

// export const fetchProductDetail = (payload) => {
//   return {
//     type: FETCH_PRODUCT_DETAIL,
//     payload,
//   };
// };

// export const resetProduct = (payload) => {
//   return {
//     type: RESET_PRODUCT,
//     payload,
//   };
// };
