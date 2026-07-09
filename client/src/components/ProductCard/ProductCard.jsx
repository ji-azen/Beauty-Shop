import "./ProductCard.css";

import {
    FiHeart,
    FiShoppingCart,
    FiStar
} from "react-icons/fi";

function ProductCard() {

    return (

        <div className="product-card">

            <div className="product-image">

                <img
                    src="https://placehold.co/300x300"
                    alt="produk"
                />

            </div>

            <div className="product-info">

                <h3>Somethinc</h3>

                <p>Niacinamide Serum</p>

                <div className="rating">

                    <FiStar />

                    <span>4.9</span>

                    <small>(2.341)</small>

                </div>

                <h2>Rp89.000</h2>

            </div>

            <div className="product-action">

                <button>

                    <FiHeart />

                </button>

                <button className="cart-btn">

                    <FiShoppingCart />

                    Tambah

                </button>

            </div>

        </div>

    );

}

export default ProductCard;