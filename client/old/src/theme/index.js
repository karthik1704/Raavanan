import dark from './dark';
import light from './light';

export function getThemeByName(theme) {
  return themeMap[theme];
}

const themeMap = {
  light,
  dark,
};
