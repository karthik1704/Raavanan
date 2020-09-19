import { TOGGLE_DARK_MODE } from '../CONSTANTS';

const initalState = {
  darkMode: false,
};

const appReducer = (state = initalState, { type, payload }) => {
  switch (type) {
    case TOGGLE_DARK_MODE:
      return {
        ...state,
        darkMode: !state.darkMode,
      };

    default:
      return state;
  }
};

export default appReducer;
