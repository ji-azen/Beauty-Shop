import { Link } from "react-router-dom";
import {
    FiHeart,
    FiShoppingCart,
    FiCheck
} from "react-icons/fi";

import api from "../../api/axios";
import { useStore } from "../../context/StoreContext";

import "./ProductCard.css";

function ProductCard({ product }) {

    const {

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

    const imageUrl = product.image

        ? `http://localhost:5000${product.image}`

        : "https://placehold.co/400x400?text=No+Image";

    async function addToCartDatabase() {

        const token = localStorage.getItem("token");

        if (!token) {

            alert("Silakan login terlebih dahulu");

            return;

        }

        try {

            await api.post(

                "/cart",

                {

                    product_id: product.id,

                    quantity: 1

                },

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            alert("🛒 Produk berhasil ditambahkan");

        }

        catch (error) {

            console.log(error);

            console.log(error.response);

            alert("Gagal menambahkan produk");

        }

    }

    return (

        <div className="product-card">

            <Link

                to={`/product/${product.id}`}

                className="product-image"

            >

                <img

                    src={imageUrl}

                    alt={product.name}

                    onError={(e) => {

                        e.target.src =
                            "https://placehold.co/400x400?text=No+Image";

                    }}

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

                <div className="rating">

                    ⭐ {product.rating || 5}

                    <span>

                        ({product.review || 0})

                    </span>

                </div>

                <h2>

                    Rp {Number(product.price).toLocaleString("id-ID")}

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

                        onClick={addToCartDatabase}

                    >

                        {

                            isInCart

                                ?

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