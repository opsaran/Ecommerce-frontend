import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AuthContextProvider } from "./contexts/authcontext";
import Navbar from "./components/navbar/navbar";
import HomePage from "./pages/home/home";
import Login from "./pages/login/login";
import Signup from "./pages/register/register";
import ProductDetails from "./pages/product-details/productDetails";
import CartModal from "./components/cartmodal";
import CartPage from "./pages/cart/cartpage";
import SellerPost from "./pages/sellerpost/sellerpost";

function App() {
  const location = useLocation();
  const state = location.state as { backgroundLocation: Location };
  return (
    <div className="App">
      <AuthContextProvider>
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
