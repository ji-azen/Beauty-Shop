import { useState } from "react";
import "./Navbar.css";

import Sidebar from "../Sidebar/Sidebar";

import { Link } from "react-router-dom";

import {
    FiSearch,
    FiHeart,
    FiShoppingCart,
    FiUser,
    FiMenu,
} from "react-icons/fi";

function Navbar() {

    const [openSidebar, setOpenSidebar] = useState(false);

    return (

        <>

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

                    <button
                        className="filter-btn"
                        onClick={() => setOpenSidebar(true)}
                    >

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

            <Sidebar
                open={openSidebar}
                onClose={() => setOpenSidebar(false)}
            />

        </>

    );

}

export default Navbar;