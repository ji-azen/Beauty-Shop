import { 
    useState 
} from "react";


import { 
    useParams,
    useNavigate
} from "react-router-dom";


import Navbar from "../../components/Navbar/Navbar";

import products from "../../data/products";

import { 
    useStore 
} from "../../context/StoreContext";


import "./ProductDetail.css";



function ProductDetail(){


    const {

        id

    } = useParams();



    const navigate = useNavigate();



    const {

        addToCart,

        toggleWishlist,

        setCheckoutItems,

    } = useStore();




    const product = products.find(

        item=>item.id === Number(id)

    );





    const [qty,setQty] = useState(1);







    if(!product){


        return(

            <h2>

                Produk tidak ditemukan

            </h2>

        );


    }








    function handleCart(){



        for(let i=0;i<qty;i++){

            addToCart(product);

        }



    }








    function buyNow(){


        setCheckoutItems([

            {

                ...product,

                qty:qty

            }

        ]);



        navigate("/checkout");


    }









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









                <div className="stock">


                    Stok tersedia: <b>99</b>


                </div>









                <div className="quantity">



                    <span>

                        Jumlah

                    </span>




                    <button

                        onClick={()=>{

                            if(qty>1)

                            setQty(qty-1)

                        }}

                    >

                        -

                    </button>




                    <b>

                        {qty}

                    </b>




                    <button

                        onClick={()=>setQty(qty+1)}

                    >

                        +

                    </button>




                </div>









                <div className="delivery">


                    🚚 Gratis ongkir


                    <br/>


                    📦 Estimasi 1-3 hari


                </div>









                <div className="detail-btn">





                    <button

                        onClick={handleCart}

                    >

                        🛒 Keranjang

                    </button>








                    <button

                        className="buy-btn"

                        onClick={buyNow}

                    >

                        ⚡ Beli Sekarang

                    </button>







                    <button

                        className="wishlist-btn"

                        onClick={()=>toggleWishlist(product)}

                    >

                        ❤️

                    </button>






                </div>







            </div>







        </main>



        </>


    );

}



export default ProductDetail;