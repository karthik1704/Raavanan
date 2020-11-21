import { useSelector, useDispatch } from 'react-redux';
import { toggleAppLoading } from '../data/actions/appAction';

const useTopLoader = () => {
  const { loading } = useSelector((state) => state.appUi);
  const dispatch = useDispatch();

  const onToggleTopLoader = () => {
    setTimeout(() => {
      dispatch(toggleAppLoading(!loading));
    }, 500);
  };

  return [loading, onToggleTopLoader];
};

export default useTopLoader;
