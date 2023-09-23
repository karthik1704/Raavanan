import {
  LOGIN,
  LOGOUT
 
} from '../CONSTANTS';
// import customAxios from '../../navigation/NavigationService';
// import customAxios from '../../navigation/NavigationService';
import { syncCart } from '../../views/Cartpage/cart.utils';
// const initalState = {
//   user: {},
// };
const initalState =   {user: {},loggedIn:false }


const loginReducer = (state = initalState, { type, payload }) => {
  switch (type) {
    case LOGIN: 
    localStorage.setItem("app_token", `Bearer ${payload.access_token}`)
      // axios.defaults.headers.common['Authorization'] = `Bearer ${payload.access_token}`
      
      return {
        ...state,
        user: {...payload},
        loggedIn:true
      };
      case LOGOUT:
        localStorage.setItem("app_token", '')    
        // axios.defaults.headers.common['Authorization'] = '';  
      return {
        ...state,
        user: {},
        loggedIn:false
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

export default loginReducer;
