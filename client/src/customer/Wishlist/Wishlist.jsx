import Navbar from "../../components/Navbar/Navbar";

import {
    FiShoppingCart,
    FiCheck,
    FiTrash2
} from "react-icons/fi";

import { useStore } from "../../context/StoreContext";

import "./Wishlist.css";


function Wishlist(){


    const {
        wishlist,
        toggleWishlist,
        addToCart,
        cart
    } = useStore();




    return(

        <>

            <Navbar/>


            <div className="wishlist-page">


                <h1>
                    ❤️ Wishlist Saya
                </h1>




                {
                    wishlist.length === 0 ?


                    (

                        <div className="empty-wishlist">

                            <h2>
                                Wishlist masih kosong 😢
                            </h2>

                            <p>
                                Simpan produk favorit kamu disini
                            </p>

                        </div>

                    )


                    :


                    (

                        <div className="wishlist-list">


                            {
                                wishlist.map(item=>{


                                    const isInCart = cart.some(
                                        product=>product.id===item.id
                                    );



                                    return(

                                        <div
                                            className="wishlist-item"
                                            key={item.id}
                                        >



                                            <img

                                                src={item.image}

                                                alt={item.name}

                                            />





                                            <div className="wishlist-info">


                                                <h3>
                                                    {item.brand}
                                                </h3>


                                                <p>
                                                    {item.name}
                                                </p>


                                                <span>

                                                    ⭐ {item.rating}

                                                    ({item.review})

                                                </span>



                                                <b>

                                                    Rp {item.price.toLocaleString("id-ID")}

                                                </b>


                                            </div>






                                            <div className="wishlist-action">


                                                <button

                                                    className={
                                                        isInCart
                                                        ?
                                                        "added"
                                                        :
                                                        ""
                                                    }

                                                    onClick={()=>addToCart(item)}

                                                >

                                                    {
                                                        isInCart

                                                        ?

                                                        <>
                                                            <FiCheck/>
                                                            Sudah di Cart
                                                        </>


                                                        :

                                                        <>
                                                            <FiShoppingCart/>
                                                            Keranjang
                                                        </>
                                                    }


                                                </button>





                                                <button

                                                    className="remove"

                                                    onClick={()=>toggleWishlist(item)}

                                                >

                                                    <FiTrash2/>

                                                    Hapus

                                                </button>


                                            </div>




                                        </div>

                                    );


                                })
                            }


                        </div>

                    )
                }



            </div>

        </>

    );

}


export default Wishlist;