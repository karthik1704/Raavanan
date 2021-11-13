import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

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

import AppLayout from '../Layout/AppLayout';
import AuthLayout from '../Layout/AuthLayout';

function RequireAuth({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  let location = useLocation();

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        {/* <Route
          index
          render={(props) => {
            ReactGA.pageview(props.location.pathname);
            return <Home />;
          }}
        /> */}
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="terms" element={<Terms />} />
        <Route path="Cartpage" element={<Cartpage />} />

        <Route
          path="product/:id"
          // render={(props) => {
          //   ReactGA.pageview(props.location.pathname);
          //   return <ProductDetail />;
          // }}
          element={<ProductDetail />}
        />

        <Route path=":category" element={<Products />} />

        <Route path=":id/waorder" element={<WAOrder />} />
        <Route path="orders" element={<Orders />}>
          <Route path="orderdetail/:id" element={<OrdersDetail />} />
        </Route>
        <Route
          path="/checkout"
          element={
            <RequireAuth>
              <Checkout />
            </RequireAuth>
          }
        />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="Otpverification" element={<Otpverification />} />
        <Route path="Forgetpassword" element={<Forgetpassword />} />
      </Route>

      <Route
        path="/orderconfirmation/:status"
        element={
          <RequireAuth>
            <Orderconfirm />
          </RequireAuth>
        }
      />

      <Route path="*" element={<div>Hi, page not found</div>} />
    </Routes>
  );
};

export default AppRoutes;
