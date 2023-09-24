import { Provider } from 'react-redux';

import store from './data/store';
import Layout from '~/old-app/Layout';

function App() {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
}

export default App;
