import { Link } from "react-router-dom";

import {
    FiHeart,
    FiShoppingCart
} from "react-icons/fi";

import { useStore } from "../../context/StoreContext";

import "./ProductCard.css";



function ProductCard({product}){


    const {

        addToCart,

        toggleWishlist,

        wishlist

    } = useStore();





    const isWishlisted = wishlist.some(

        item=>item.id===product.id

    );





    return(


        <div className="product-card">


            <Link

                to={`/product/${product.id}`}

            >

                <img

                    src={product.image}

                    alt={product.name}

                />

            </Link>





            <div className="product-info">


                <p>

                    {product.brand}

                </p>



                <Link

                    to={`/product/${product.id}`}

                >

                    <h3>

                        {product.name}

                    </h3>

                </Link>





                <span>

                    ⭐ {product.rating}

                </span>





                <h3>

                    Rp {product.price.toLocaleString("id-ID")}

                </h3>





                <div className="product-action">


                    <button

                        onClick={()=>toggleWishlist(product)}

                    >

                        <FiHeart

                            fill={
                                isWishlisted
                                ?
                                "red"
                                :
                                "none"
                            }

                            color={
                                isWishlisted
                                ?
                                "red"
                                :
                                "black"
                            }

                        />


                    </button>





                    <button

                        onClick={()=>addToCart(product)}

                    >

                        <FiShoppingCart/>

                        Keranjang

                    </button>


                </div>



            </div>



        </div>


    );


}



export default ProductCard;