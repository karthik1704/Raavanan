import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';

import Home from '../views/home/Home';
import Products from '../views/products/Products';
import ProductDetail from '../views/productDetail/ProductDetail';
import WAOrder from '../views/wAOrder/WAOrder';
import Checkout from '../views/Checkout/Checkout';

import Otpverification from '../views/Otpverification/Otpverification';
import Cartpage from '../views/Cartpage/Cartpage';
import Orderconfirm from '../components/Checkout/order-confirm';
import Orders from '../views/Orders/Orders';
import OrdersDetail from '../views/OrdersDetail/OrdersDetail';

import AppLayout from '../Layout/AppLayout';
import AuthLayout from '../Layout/AuthLayout';
import PageNotFound from '../views/PageNotFound/PageNotFound';

import Login from '../views/Login/Login';
import Register from '../views/Register/Register';

// const AuthLayout = lazy(() => import('../Layout/AuthLayout'));
const About = lazy(() => import('../views/about/About'));
const Contact = lazy(() => import('../views/contact/Contact'));
const Terms = lazy(() => import('../views/terms/Terms'));
// const Login = lazy(() => import('../views/Login/Login'));
// const Register = lazy(() => import('../views/Register/Register'));
const Forgetpassword = lazy(() =>
  import('../views/Forgetpassword/Forgetpassword')
);

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
        <Route index element={<Home />} />
        <Route
          path="about"
          element={
            <Suspense fallback={'Loading...'}>
              <About />
            </Suspense>
          }
        />
        <Route
          path="contact"
          element={
            <Suspense fallback={'Loading...'}>
              <Contact />
            </Suspense>
          }
        />
        <Route
          path="terms"
          element={
            <Suspense fallback={'Loading...'}>
              <Terms />
            </Suspense>
          }
        />
        <Route path="Cartpage" element={<Cartpage />} />

        <Route path="product/:id" element={<ProductDetail />} />

        <Route path=":category" element={<Products />} />

        <Route path=":id/waorder" element={<WAOrder />} />
        <Route
          path="orders"
          element={
            <RequireAuth>
              <Orders />
            </RequireAuth>
          }
        >
          <Route
            path=":id"
            element={
              <RequireAuth>
                <OrdersDetail />
              </RequireAuth>
            }
          />
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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="Otpverification" element={<Otpverification />} />
        <Route
          path="Forgetpassword"
          element={
            <Suspense fallback={'Loading...'}>
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
