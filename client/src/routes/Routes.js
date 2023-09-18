import { Routes, Route, Navigate } from 'react-router-dom';

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
    <Routes>
      <Route path="/" element={<Home/>} exact />
       
      <Route path="/about" element={<About/>} exact />
      
      <Route path="/contact" element={<Contact/>} exact />
       
      {/* <Route path="/login" exact>
        <Login />
      </Route> */}
      <Route
        exact
        path="/login"
        element={<Login/>}
      />

      <Route
        exact
        path="/register"
        element={<Register/>}

        // render={() => (loggedIn ? <Navigate to="/" /> : <Register />)}
      />
      <Route path="/Otpverification" element={<Otpverification/>} exact />
   
      <Route path="/Forgetpassword" element={<Forgetpassword/>} exact />
   
      <Route path="/Cartpage" element={<Cartpage/>} exact />
       
      <Route path="/orders" element={<Orders/>} exact >
        <Route path=":id" element={ <OrdersDetail />} exact />
      </Route>
       
      <Route
        exact
        path="/orderconfirmation/:status"
        render={() => (loggedIn ? <Orderconfirm /> : <Navigate to="/login" />)}
      />
      <Route
        exact
        path="/checkout"
        render={() => (loggedIn ? <Checkout /> : <Navigate to="/login" />)}
      />

      <Route path="/terms" element={ <Terms />} exact />
        
  
      <Route path="/:category" element={ <Products />} exact />
        

      <Route path="/:id/waorder" element={ <WAOrder />} exact />
       
     

      <Route
        path="/product/:id"
        element={ <ProductDetail />}
      
        exact
      />
    </Routes>
  );
};

export default Router;
