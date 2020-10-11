import React from 'react';
import { Switch, Route } from 'react-router-dom';

import About from '../views/about/About';
import Contact from '../views/contact/Contact';
import Home from '../views/home/Home';
import Products from '../views/products/Products';
import Terms from '../views/terms/Terms';
import ProductDetail from '../views/productDetail/ProductDetail';

const Router = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
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
      <Route path="/product/:id" exact>
        <ProductDetail />
      </Route>
    </Switch>
  );
};

export default Router;
