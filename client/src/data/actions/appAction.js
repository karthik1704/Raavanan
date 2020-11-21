import {
  TOGGLE_THEME,
  TOGGLE_APP_DRAWER,
  TOGGLE_APP_LOADING,
} from '../CONSTANTS';

export const changeTheme = (payload) => {
  return {
    type: TOGGLE_THEME,
    payload,
  };
};

export const toggleAppDrawer = (payload) => {
  return {
    type: TOGGLE_APP_DRAWER,
    payload,
  };
};

export const toggleAppLoading = (payload) => {
  return {
    type: TOGGLE_APP_LOADING,
    payload,
  };
};
