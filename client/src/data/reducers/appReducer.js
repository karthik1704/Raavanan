import { TOGGLE_THEME, TOGGLE_APP_DRAWER } from '../CONSTANTS';

const initalState = {
  theme: 'light',
  loading: true,
  appDrawerOpen: false,
};

const appReducer = (state = initalState, { type, payload }) => {
  switch (type) {
    case TOGGLE_THEME:
      return {
        ...state,
        theme: payload,
      };

    case TOGGLE_APP_DRAWER:
      return {
        ...state,
        appDrawerOpen: payload,
      };

    default:
      return state;
  }
};

export default appReducer;
