import { useState } from "react";

import {
    FiSearch,
    FiHeart,
    FiShoppingCart,
    FiUser,
    FiMenu,
    FiLogOut
} from "react-icons/fi";

import {
    Link,
    useNavigate
} from "react-router-dom";

import Sidebar from "../Sidebar/Sidebar";

import { useAuth } from "../../context/AuthContext";
import { useStore } from "../../context/StoreContext";

import "./Navbar.css";


function Navbar({
    search,
    setSearch,
    category,
    setCategory,
    price,
    setPrice
}){

    const [openSidebar,setOpenSidebar] = useState(false);
    const [openUser,setOpenUser] = useState(false);

    const navigate = useNavigate();

    const {user,logout} = useAuth();

    const {cart} = useStore();


    const totalCart = cart.reduce(
        (sum,item)=>sum + item.qty,
        0
    );


    const handleLogout = ()=>{

        logout();
        setOpenUser(false);
        navigate("/login");

    };


    return(
        <>

            <nav className="navbar">


                <Link 
                    to="/"
                    className="logo"
                >
                    🩵 Beauty Store
                </Link>



                <div className="search-box">

                    <FiSearch/>

                    <input
                        type="text"
                        placeholder="Cari skincare, makeup..."
                        value={search || ""}
                        onChange={(e)=>setSearch(e.target.value)}
                    />

                </div>




                <div className="menu-right">


                    <button
                        className="filter-btn"
                        onClick={()=>setOpenSidebar(true)}
                    >

                        <FiMenu/>
                        Filter

                    </button>




                    <Link to="/wishlist">

                        <FiHeart/>

                    </Link>





                    <Link
                        to="/cart"
                        className="cart-icon"
                    >

                        <FiShoppingCart/>


                        {
                            totalCart > 0 &&
                            <span className="badge">
                                {totalCart}
                            </span>
                        }


                    </Link>





                    <div className="user-area">


                        <button
                            className="user-btn"
                            onClick={()=>setOpenUser(!openUser)}
                        >

                            <FiUser/>

                            {
                                user &&
                                <span>
                                    {user.name}
                                </span>
                            }

                        </button>





                        {
                            openUser &&

                            <div className="user-dropdown">


                                {
                                    user ?

                                    <>

                                        <Link to="/profile">
                                            👤 Profile Saya
                                        </Link>


                                        <button
                                            onClick={handleLogout}
                                        >

                                            <FiLogOut/>
                                            Logout

                                        </button>

                                    </>

                                    :

                                    <>

                                        <Link to="/login">
                                            Login
                                        </Link>


                                        <Link to="/register">
                                            Daftar
                                        </Link>

                                    </>

                                }


                            </div>

                        }


                    </div>



                </div>


            </nav>





            <Sidebar

                open={openSidebar}

                onClose={()=>setOpenSidebar(false)}

                category={category}

                setCategory={setCategory}

                price={price}

                setPrice={setPrice}

            />

        </>
    );
}


export default Navbar;