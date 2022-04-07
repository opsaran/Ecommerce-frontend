import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AuthContextProvider } from "./contexts/authcontext";
import Navbar from "./components/navbar/navbar";
import HomePage from "./pages/home/home";

const Login = React.lazy(() => import("./pages/login/login"));
const Signup = React.lazy(() => import("./pages/register/register"));
const ProductDetails = React.lazy(
  () => import("./pages/product-details/productDetails")
);
const CartPage = React.lazy(() => import("./pages/cart/cartpage"));
const SellerPost = React.lazy(() => import("./pages/sellerpost/sellerpost"));
import CartModal from "./components/cartmodal";

function App() {
  const location = useLocation();
  const state = location.state as { backgroundLocation: Location };
  return (
    <div className="App">
      <AuthContextProvider>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Routes location={state?.backgroundLocation || location}>
            <Route
              path="/"
              element={<Navbar style={state?.backgroundLocation && {}} />}
            >
              <Route index element={<HomePage />} />

              <Route path="product/:id" element={<ProductDetails />}></Route>
              <Route path="register" element={<Signup />}></Route>
              <Route path="login" element={<Login />}></Route>
              <Route path="cart" element={<CartPage />}></Route>
              <Route path="sellerpost" element={<SellerPost />}></Route>
            </Route>
          </Routes>
        </React.Suspense>
        {/* show the modal when backgroundLocation is set */}
        {state?.backgroundLocation && (
          <Routes>
            <Route path="/cart" element={<CartModal />}></Route>
          </Routes>
        )}
      </AuthContextProvider>
    </div>
  );
}

export default App;
