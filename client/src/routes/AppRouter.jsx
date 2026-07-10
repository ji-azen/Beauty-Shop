import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";


// CUSTOMER
import Home from "../customer/Home/Home";
import Cart from "../customer/Cart/Cart";
import Wishlist from "../customer/Wishlist/Wishlist";
import ProductDetail from "../customer/ProductDetail/ProductDetail";
import Profile from "../customer/Profile/Profile";
import Checkout from "../customer/Checkout/Checkout";
import Orders from "../pages/Orders/Orders";


// AUTH
import Login from "../auth/Login/Login";
import Register from "../auth/Register/Register";
import ForgotPassword from "../auth/ForgotPassword/ForgotPassword";


function AppRouter(){


    return(

        <BrowserRouter>


            <Routes>


                {/* CUSTOMER */}

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



                {/* AUTH */}

                <Route
                    path="/login"
                    element={<Login />}
                />


                <Route
                    path="/register"
                    element={<Register />}
                />


                <Route
                    path="/forgot-password"
                    element={<ForgotPassword />}
                />


                <Route
                    path="/profile"
                    element={<Profile />}
                />


                <Route
                    path="/checkout"
                    element={<Checkout />}
                />


                <Route 
                    path="/orders" 
                    element={<Orders/>}
                />

                
            </Routes>


        </BrowserRouter>

    );

}


export default AppRouter;