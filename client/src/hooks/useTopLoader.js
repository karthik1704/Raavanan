import { useSelector, useDispatch } from 'react-redux';

import { toggleLoader } from '../features/loader/loaderSlice';

const useTopLoader = () => {
  const { topLoader } = useSelector((state) => state.loader);
  const dispatch = useDispatch();

  const onToggleTopLoader = (loader) => {
    setTimeout(() => {
      dispatch(toggleLoader(loader));
    }, 500);
  };

  return [topLoader, onToggleTopLoader];
};

export default useTopLoader;
