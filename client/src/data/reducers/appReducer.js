import { TOGGLE_DARK_MODE } from '../CONSTANTS';

const initalState = {
  darkmode: false,
};

const appReducer = (state = initalState, { type, payload }) => {
  switch (type) {
    case TOGGLE_DARK_MODE:
      return {
        ...state,
        darkmode: !state.darkmode,
      };

    default:
      return state;
  }
};

export default appReducer;
