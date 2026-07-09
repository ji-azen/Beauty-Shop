import "./ProductCard.css";

import {
    FiHeart,
    FiShoppingCart,
    FiStar
} from "react-icons/fi";

function ProductCard({product}) {

    return (

        <div className="product-card">

            <div className="product-image">
                <img
                    src={product.image}
                    alt={product.name}
                />
            </div>

            <div className="product-info">

                <h3>{product.brand}</h3>

                <p>{product.name}</p>

                <div className="rating">

                    <FiStar />

                    <span>{product.rating}</span>

                    <small>({product.review})</small>

            </div>
                <h2>
                Rp {product.price.toLocaleString("id-ID")}
                </h2>
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