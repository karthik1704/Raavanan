import {
  
  LOGIN,LOGOUT
} from '../CONSTANTS';

// eslint-disable-next-line import/prefer-default-export

export const loginUser = (payload) => {
  return {
    type: LOGIN,
    payload,
  };
};

export const logoutUser = (payload) => {
  return {
    type: LOGOUT,
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
