import { useParams } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";

import products from "../../data/products";

import { useStore } from "../../context/StoreContext";

import "./ProductDetail.css";

function ProductDetail() {

    const { id } = useParams();

    const { addToCart, toggleWishlist } = useStore();

    const product = products.find(
        item => item.id === Number(id)
    );

    if (!product) {

        return <h2>Produk tidak ditemukan.</h2>;

    }

    return (

        <>

            <Navbar />

            <div className="detail-page">

                <div className="detail-image">

                    <img
                        src={product.image}
                        alt={product.name}
                    />

                </div>

                <div className="detail-info">

                    <h2>{product.brand}</h2>

                    <h1>{product.name}</h1>

                    <p>

                        ⭐ {product.rating}

                        ({product.review} Review)

                    </p>

                    <h3>

                        Rp {product.price.toLocaleString("id-ID")}

                    </h3>

                    <p>

                        Produk original 100%.

                        Aman digunakan setiap hari.

                        Cocok untuk semua jenis kulit.

                    </p>

                    <div className="detail-btn">

                        <button
                            onClick={() => addToCart(product)}
                        >

                            + Keranjang

                        </button>

                        <button
                            className="wishlist-btn"
                            onClick={() => toggleWishlist(product)}
                        >

                            ❤️ Wishlist

                        </button>

                    </div>

                </div>

            </div>

        </>

    );

}

export default ProductDetail;