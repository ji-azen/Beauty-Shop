import { Link } from "react-router-dom";
import { useStore } from "../../context/StoreContext";

import "./ProductCard.css";

import {
    FiHeart,
    FiShoppingCart,
    FiStar
} from "react-icons/fi";


function ProductCard({ product }) {

    const {
        addToCart,
        toggleWishlist,
        wishlist
    } = useStore();


    const isFavorite = wishlist.some(
        item => item.id === product.id
    );


    return (

        <div className="product-card">


            <Link 
                to={`/product/${product.id}`}
                className="product-link"
            >

                <div className="product-image">

                    <img
                        src={product.image}
                        alt={product.name}
                    />

                </div>


                <div className="product-info">

                    <h3>
                        {product.brand}
                    </h3>


                    <p>
                        {product.name}
                    </p>


                    <div className="rating">

                        <FiStar />

                        <span>
                            {product.rating}
                        </span>

                        <small>
                            ({product.review})
                        </small>

                    </div>


                    <h2>
                        Rp {product.price.toLocaleString("id-ID")}
                    </h2>


                </div>

            </Link>



            <div className="product-action">


                <button
                    onClick={() => toggleWishlist(product)}
                >

                    <FiHeart
                        color={isFavorite ? "red" : ""}
                    />

                </button>



                <button
                    className="cart-btn"
                    onClick={() => addToCart(product)}
                >

                    <FiShoppingCart />

                    Tambah

                </button>


            </div>


        </div>

    );

}


export default ProductCard;