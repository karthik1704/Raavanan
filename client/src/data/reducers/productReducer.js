import { FETCH_PRODUCT_DETAIL, FETCH_PRODUCT } from '../CONSTANTS';

import Image1 from '../../asserts/images/main model 3.png';
import Image2 from '../../asserts/images/main model 4.png';
import Image3 from '../../asserts/images/main model 5.png';

const initalState = {
  products: [
    // {
    //   id: 1,
    //   name: 'Ma Phone Case 1',
    //   price: 399,
    //   offer: '20%',
    //   category: 'phonecase',
    //   mrp: 500,
    //   imageUrl: Image1,
    // },
    // {
    //   id: 2,
    //   name: 'சேயோன் கைபேசி உறை',
    //   price: 399,
    //   offer: '20%',
    //   category: 'phonecase',
    //   mrp: 500,
    //   imageUrl: Image2,
    // },
    // {
    //   id: 3,
    //   name: 'Phone Case 3',
    //   price: 399,
    //   offer: '20%',
    //   category: 'phonecase',
    //   mrp: 500,
    //   imageUrl: Image3,
    // },
    // {
    //   id: 4,
    //   name: 'Phone Case 1',
    //   price: 399,
    //   offer: '20%',
    //   category: 'phonecase',
    //   mrp: 500,
    //   imageUrl: Image1,
    // },
    // {
    //   id: 5,
    //   name: 'Phone Case 2',
    //   price: 399,
    //   offer: '20%',
    //   category: 'phonecase',
    //   mrp: 500,
    //   imageUrl: Image2,
    // },
    // {
    //   id: 6,
    //   name: 'Phone Case 3',
    //   price: 399,
    //   offer: '20%',
    //   category: 'phonecase',
    //   mrp: 500,
    //   imageUrl: Image3,
    // },
  ],
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
