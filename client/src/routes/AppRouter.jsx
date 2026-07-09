import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../customer/Home/Home";
import Product from "../customer/Product/Product";
import Cart from "../customer/Cart/Cart";
import Wishlist from "../customer/Wishlist/Wishlist";
import Profile from "../customer/Profile/Profile";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Product />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/wishlist" element={<Wishlist />} />

        <Route path="/profile" element={<Profile />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;