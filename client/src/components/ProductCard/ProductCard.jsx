import { Link } from "react-router-dom";

import {

    FiHeart,

    FiShoppingCart,

    FiCheck

} from "react-icons/fi";

import { useStore } from "../../context/StoreContext";

import "./ProductCard.css";

function ProductCard({ product }) {

    const {

        addToCart,

        toggleWishlist,

        wishlist,

        cart

    } = useStore();



    const isWishlisted = wishlist.some(

        item => item.id === product.id

    );



    const isInCart = cart.some(

        item => item.id === product.id

    );



    return (

        <div className="product-card">

            <Link

                to={`/product/${product.id}`}

                className="product-image"

            >

                <img

                    src={

                        product.image

                            ?

                            product.image

                            :

                            "https://placehold.co/300x300?text=No+Image"

                    }

                    alt={product.name}

                />

            </Link>



            <div className="product-info">

                <p className="brand">

                    {product.brand}

                </p>



                <Link

                    to={`/product/${product.id}`}

                    className="product-name"

                >

                    <h3>

                        {product.name}

                    </h3>

                </Link>



                <p className="category">

                    🌻 {product.category || "Beauty Product"}

                </p>



                <h2>

                    Rp {

                        Number(product.price)

                            .toLocaleString("id-ID")

                    }

                </h2>



                <div className="product-action">

                    <button

                        className={

                            isWishlisted

                                ?

                                "wishlist active"

                                :

                                "wishlist"

                        }

                        onClick={() =>

                            toggleWishlist(product)

                        }

                    >

                        <FiHeart />

                    </button>



                    <button

                        className={

                            isInCart

                                ?

                                "cart-btn added"

                                :

                                "cart-btn"

                        }

                        onClick={() =>

                            addToCart(product)

                        }

                    >

                        {

                            isInCart ?

                                <>

                                    <FiCheck />

                                    Ditambahkan

                                </>

                                :

                                <>

                                    <FiShoppingCart />

                                    Keranjang

                                </>

                        }

                    </button>

                </div>

            </div>

        </div>

    );

}

export default ProductCard;