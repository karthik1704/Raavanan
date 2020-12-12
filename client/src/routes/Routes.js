import { Switch, Route } from 'react-router-dom';

import ReactGA from 'react-ga';

import About from '../views/about/About';
import Contact from '../views/contact/Contact';
import Home from '../views/home/Home';
import Products from '../views/products/Products';
import Terms from '../views/terms/Terms';
import ProductDetail from '../views/productDetail/ProductDetail';
import WAOrder from '../views/wAOrder/WAOrder';

const Router = () => {
  return (
    <Switch>
      <Route
        path="/"
        render={(props) => {
          ReactGA.pageview(props.location.pathname);
          return <Home />;
        }}
        exact
      />

      <Route path="/about" exact>
        <About />
      </Route>
      <Route path="/contact" exact>
        <Contact />
      </Route>
      <Route path="/terms" exact>
        <Terms />
      </Route>
      <Route path="/:category" exact>
        <Products />
      </Route>
      <Route path="/:id/waorder" exact>
        <WAOrder />
      </Route>
      <Route
        path="/product/:id"
        render={(props) => {
          ReactGA.pageview(props.location.pathname);
          return <ProductDetail />;
        }}
        exact
      />
    </Switch>
  );
};

export default Router;
