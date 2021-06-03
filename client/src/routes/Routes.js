import { Switch, Route, BrowserRouter,Redirect } from 'react-router-dom';

import ReactGA from 'react-ga';
import { useSelector } from 'react-redux';
import About from '../views/about/About';
import Contact from '../views/contact/Contact';
import Home from '../views/home/Home';
import Products from '../views/products/Products';
import Terms from '../views/terms/Terms';
import ProductDetail from '../views/productDetail/ProductDetail';
import WAOrder from '../views/wAOrder/WAOrder';
import Checkout from '../views/Checkout/Checkout';

import Login from '../views/Login/Login';
import Register from '../views/Register/Register';
import Otpverification from '../views/Otpverification/Otpverification';
import Forgetpassword from '../views/Forgetpassword/Forgetpassword';
import Cartpage from '../views/Cartpage/Cartpage';
import Orderconfirm from '../components/Checkout/order-confirm';
import Orders from '../views/Orders/Orders';
import OrdersDetail from '../views/OrdersDetail/OrdersDetail';





const Router = () => {
  const login = useSelector((state) => state.login);
  const loggedIn = login.loggedIn;
  
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
      {/* <Route path="/login" exact>
        <Login />
      </Route> */}
      <Route
            exact
            path='/login'
            render={() =>
              loggedIn ? (
                <Redirect to='/' />
              ) : (
                <Login />
              )
            }
          />
      
      <Route
            exact
            path='/register'
            render={() =>
              loggedIn ? (
                <Redirect to='/' />
              ) : (
                <Register />
              )
            }
          />
      <Route path="/Otpverification" exact>
        <Otpverification />
      </Route>
      <Route path="/Forgetpassword" exact>
        <Forgetpassword />
      </Route>
      <Route path="/Cartpage" exact>
        <Cartpage />
      </Route>
      <Route path="/orders" exact>
        <Orders />
      </Route>
      <Route path="/orderdetail/:id" exact>
        <OrdersDetail />
      </Route>
      <Route
            exact
            path='/orderconfirmation/:status'
            render={() =>
              loggedIn ? (
                <Orderconfirm />
              ) : (
                <Redirect to='/login' />
              )
            }
            />
      <Route
            exact
            path='/checkout'
            render={() =>
              loggedIn ? (
                <Checkout />
                
              ) : (
                <Redirect to='/login' />
              )
            }
          />
     
     
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
            exact
            path='/terms'>
            
            <Terms />
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
