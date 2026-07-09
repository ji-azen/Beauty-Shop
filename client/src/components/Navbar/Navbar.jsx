import "./Navbar.css";

import { Link } from "react-router-dom";

import {
    FiSearch,
    FiHeart,
    FiShoppingCart,
    FiUser,
    FiMenu
} from "react-icons/fi";

function Navbar() {

    return (

        <nav className="navbar">

            <div className="logo">
                🩵 Beauty Store
            </div>

            <div className="search-box">

                <FiSearch />

                <input
                    type="text"
                    placeholder="Cari skincare, makeup..."
                />

            </div>

            <div className="menu-right">

                <button className="filter-btn">

                    <FiMenu />

                    Filter

                </button>

                <Link to="/wishlist">
                    <FiHeart />
                </Link>

                <Link to="/cart">
                    <FiShoppingCart />
                </Link>

                <Link to="/profile">
                    <FiUser />
                </Link>

            </div>

        </nav>

    );

}

export default Navbar;