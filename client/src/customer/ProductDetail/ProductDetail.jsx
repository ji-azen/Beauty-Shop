import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    FiHeart,
    FiShoppingCart,
    FiMinus,
    FiPlus
} from "react-icons/fi";

import Navbar from "../../components/Navbar/Navbar";
import api from "../../api/axios";
import { useStore } from "../../context/StoreContext";

import "./ProductDetail.css";

function ProductDetail() {

    const { id } = useParams();

    const {

        addToCart,

        toggleWishlist,

        wishlist

    } = useStore();

    const [product, setProduct] = useState(null);

    const [loading, setLoading] = useState(true);

    const [qty, setQty] = useState(1);

    useEffect(() => {

        async function getProduct() {

            try {

                const response = await api.get(

                    `/products/${id}`

                );

                setProduct(

                    response.data.data

                );

            }

            catch (error) {

                console.log(error);

            }

            finally {

                setLoading(false);

            }

        }

        getProduct();

    }, [id]);

    if (loading) {

        return (

            <>
                <Navbar />

                <h2
                    style={{

                        padding:40,

                        textAlign:"center"

                    }}
                >

                    Memuat Produk...

                </h2>

            </>

        );

    }

    if (!product) {

        return (

            <>
                <Navbar />

                <h2
                    style={{

                        padding:40,

                        textAlign:"center"

                    }}
                >

                    Produk tidak ditemukan.

                </h2>

            </>

        );

    }

    const isWishlisted = wishlist.some(

        item=>item.id===product.id

    );

    const imageUrl = product.image

        ? `http://localhost:5000${product.image}`

        : "https://placehold.co/700x700?text=No+Image";

    return (

        <>

            <Navbar />

            <main className="detail-page">

                <div className="detail-card">

                    <div className="detail-image">

                        <img

                            src={imageUrl}

                            alt={product.name}

                            loading="lazy"
                        />

                    </div>

                    <div className="detail-info">

                        <p className="brand">

                            {product.brand}

                        </p>

                        <h1>

                            {product.name}

                        </h1>

                        <div className="rating">

                            ⭐ 5.0

                            <span>

                                (0 Review)

                            </span>

                        </div>

                        <h2>

                            Rp {Number(product.price).toLocaleString("id-ID")}

                        </h2>

                        <p className="stock">

                            Stok :

                            <strong>

                                {" "}

                                {product.stock}

                            </strong>

                        </p>

                        <div className="description">

                            <h3>

                                Deskripsi

                            </h3>

                            <p>

                                {product.description}

                            </p>

                        </div>

                        <div className="qty-box">

                            <button

                                onClick={()=>

                                    qty>1 &&

                                    setQty(qty-1)

                                }

                            >

                                <FiMinus/>

                            </button>

                            <span>

                                {qty}

                            </span>

                            <button

                                onClick={()=>

                                    setQty(qty+1)

                                }

                            >

                                <FiPlus/>

                            </button>

                        </div>

                        <div className="detail-buttons">

                            <button

                                className="cart-btn"

                                onClick={()=>

                                    addToCart({

                                        ...product,

                                        quantity:qty

                                    })

                                }

                            >

                                <FiShoppingCart/>

                                Tambah Keranjang

                            </button>

                            <button

                                className={

                                    isWishlisted

                                    ?

                                    "wishlist active"

                                    :

                                    "wishlist"

                                }

                                onClick={()=>

                                    toggleWishlist(product)

                                }

                            >

                                <FiHeart/>

                            </button>

                        </div>

                    </div>

                </div>

            </main>

        </>

    );

}

export default ProductDetail;