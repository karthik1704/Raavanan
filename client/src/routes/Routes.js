import { HomeTwoTone } from '@material-ui/icons';
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../views/home/Home';
import About from '../views/about/About';
import Contact from '../views/contact/Contact';
import Terms from '../views/terms/Terms';

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
    </Switch>
  );
};

export default Router;
