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
import PageNotFound from '../views/PageNotFound/PageNotFound';
import { Suspense } from 'react';

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
  let location = useLocation();
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
        <Route
          path="about"
          element={
            <Suspense>
              <About />
            </Suspense>
          }
        />
        <Route
          path="contact"
          element={
            <Suspense>
              <Contact />
            </Suspense>
          }
        />
        <Route
          path="terms"
          element={
            <Suspense>
              <Terms />
            </Suspense>
          }
        />
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
          <Route path=":id" element={<OrdersDetail />} />
        </Route>
        <Route
          path="/checkout"
          element={
            <RequireAuth>
              <Checkout />
            </RequireAuth>
          }
        />

        <Route
          path="/orderconfirmation/:status"
          element={
            <RequireAuth>
              <Orderconfirm />
            </RequireAuth>
          }
        />
      </Route>
      <Route element={<AuthLayout />}>
        <Route
          path="/login"
          element={
            <Suspense>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <Suspense>
              <Register />
            </Suspense>
          }
        />
        <Route path="Otpverification" element={<Otpverification />} />
        <Route
          path="Forgetpassword"
          element={
            <Suspense>
              <Forgetpassword />
            </Suspense>
          }
        />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
