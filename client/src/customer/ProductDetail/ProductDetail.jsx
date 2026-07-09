import { useParams } from "react-router-dom";
import { useStore } from "../../context/StoreContext";

import products from "../../data/products";

import "./ProductDetail.css";


function ProductDetail() {


    const { id } = useParams();


    const {
        addToCart,
        toggleWishlist
    } = useStore();



    const product = products.find(
        item => item.id === Number(id)
    );



    if (!product) {

        return (

            <h2>
                Produk tidak ditemukan
            </h2>

        );

    }



    return (


        <div className="detail-page">


            <div className="detail-image">


                <img

                    src={product.image}

                    alt={product.name}

                />


            </div>




            <div className="detail-info">


                <h3>

                    {product.brand}

                </h3>




                <h1>

                    {product.name}

                </h1>




                <p>

                    ⭐ {product.rating}

                    ({product.review} review)

                </p>




                <h2>

                    Rp {product.price.toLocaleString("id-ID")}

                </h2>




                <p>

                    Kategori: {product.category}

                </p>




                <div className="detail-button">


                    <button

                        onClick={() => toggleWishlist(product)}

                    >

                        🤍 Wishlist

                    </button>





                    <button

                        onClick={() => addToCart(product)}

                    >

                        🛒 Tambah Keranjang

                    </button>



                </div>


            </div>


        </div>


    );

}


export default ProductDetail;