import { Switch, Route, BrowserRouter, } from 'react-router-dom';

import ReactGA from 'react-ga';

import About from '../views/about/About';
import Contact from '../views/contact/Contact';
import Home from '../views/home/Home';
import Products from '../views/products/Products';
import Terms from '../views/terms/Terms';
import ProductDetail from '../views/productDetail/ProductDetail';
import WAOrder from '../views/wAOrder/WAOrder';

import Login from '../views/Login/Login';
import Register from '../views/Register/Register';
import Otpverification from '../views/Otpverification/Otpverification';
import Forgetpassword from '../views/Forgetpassword/Forgetpassword';
import Cartpage from '../views/Cartpage/Cartpage';






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
      <Route path="/login" exact>
        <Login />
      </Route>
      <Route path="/register" exact>
        <Register />
      </Route>
      <Route path="/Otpverification" exact>
        <Otpverification />
      </Route>
      <Route path="/Forgetpassword" exact>
        <Forgetpassword />
      </Route>
      <Route path="/Cartpage" exact>
        <Cartpage />
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
