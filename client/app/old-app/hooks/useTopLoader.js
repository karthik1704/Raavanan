import { useSelector, useDispatch } from 'react-redux';
import { toggleAppLoading } from '../data/actions/appAction';

const useTopLoader = () => {
  const { loading } = useSelector((state) => state.appUi);
  const dispatch = useDispatch();

  const onToggleTopLoader = (loader) => {
    setTimeout(() => {
      dispatch(toggleAppLoading(loader));
    }, 500);
  };

  return [loading, onToggleTopLoader];
};

export default useTopLoader;
