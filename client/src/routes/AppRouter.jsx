import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../customer/Home/Home";
import Cart from "../customer/Cart/Cart";
import Wishlist from "../customer/Wishlist/Wishlist";
import ProductDetail from "../customer/ProductDetail/ProductDetail";


function AppRouter() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />


                <Route
                    path="/cart"
                    element={<Cart />}
                />


                <Route
                    path="/wishlist"
                    element={<Wishlist />}
                />


                <Route
                    path="/product/:id"
                    element={<ProductDetail />}
                />


            </Routes>

        </BrowserRouter>

    );

}


export default AppRouter;