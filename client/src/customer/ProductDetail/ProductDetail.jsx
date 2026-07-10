import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
    FiHeart,
    FiShoppingCart,
    FiMinus,
    FiPlus
} from "react-icons/fi";

import Navbar from "../../components/Navbar/Navbar";

import products from "../../data/products";

import { useStore } from "../../context/StoreContext";

import "./ProductDetail.css";


function ProductDetail(){

    const { id } = useParams();

    const navigate = useNavigate();


    const {
        addToCart,
        toggleWishlist,
        wishlist,
        setCheckoutItems
    } = useStore();



    const product = products.find(

        item => item.id === Number(id)

    );



    const [qty,setQty] = useState(1);



    if(!product){

        return (

            <>

                <Navbar />

                <h2>
                    Produk tidak ditemukan
                </h2>

            </>

        );

    }





    const isWishlist = wishlist.some(

        item => item.id === product.id

    );





    const handleAddCart = ()=>{


        for(let i=0;i<qty;i++){

            addToCart(product);

        }


    };





    const buyNow = ()=>{


        setCheckoutItems([

            {

                ...product,

                qty:qty

            }

        ]);


        navigate("/checkout");


    };






    return(

        <>

        <Navbar />


        <main className="detail-page">


            <div className="detail-image">


                <img

                    src={product.image}

                    alt={product.name}

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

                    ⭐ {product.rating}

                    <span>

                        ({product.review} Review)

                    </span>

                </div>





                <h2 className="price">

                    Rp {product.price.toLocaleString("id-ID")}

                </h2>





                <p className="description">

                    Produk original 100%.

                    Aman digunakan setiap hari.

                    Cocok untuk berbagai jenis kulit.

                </p>





                <p className="stock">

                    Stok tersedia: 100

                </p>






                <div className="quantity">


                    <button

                        onClick={()=>{

                            if(qty>1){

                                setQty(qty-1);

                            }

                        }}

                    >

                        <FiMinus />

                    </button>




                    <span>

                        {qty}

                    </span>




                    <button

                        onClick={()=>setQty(qty+1)}

                    >

                        <FiPlus />

                    </button>


                </div>








                <div className="action">


                    <button

                        className="wishlist"

                        onClick={()=>toggleWishlist(product)}

                    >

                        <FiHeart

                            fill={

                                isWishlist

                                ?

                                "red"

                                :

                                "none"

                            }

                        />

                        Wishlist

                    </button>






                    <button

                        className="cart"

                        onClick={handleAddCart}

                    >

                        <FiShoppingCart />

                        Keranjang

                    </button>


                </div>






                <button

                    className="buy"

                    onClick={buyNow}

                >

                    Beli Sekarang

                </button>





            </div>


        </main>


        </>

    );

}


export default ProductDetail;