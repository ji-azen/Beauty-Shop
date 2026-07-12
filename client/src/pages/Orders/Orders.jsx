import { useState, useEffect } from "react";

import Navbar from "../../components/Navbar/Navbar";

import {
    FiXCircle,
    FiEye,
    FiX
} from "react-icons/fi";


import { useStore } from "../../context/StoreContext";
import api from "../../api/axios";

import "./Orders.css";


function Orders(){


    const {
        orders,
        setOrders,
        showMessage
    } = useStore();



    const [selectedOrder,setSelectedOrder] = useState(null);

    const [loading,setLoading] = useState(true);





    async function getOrders(){


        try{


            const response = await api.get(
                "/orders/my"
            );


            setOrders(
                response.data.data || []
            );



        }catch(error){


            console.log(
                "Orders error:",
                error.response?.data || error
            );


            showMessage(
                "Gagal mengambil data pesanan"
            );


        }finally{


            setLoading(false);


        }


    }






    useEffect(()=>{


        getOrders();


    },[]);







    function cancelOrder(id){


        setOrders(prev=>

            prev.map(order=>

                order.id === id

                ?

                {
                    ...order,
                    status:"Dibatalkan"
                }

                :

                order

            )

        );



        showMessage(
            "❌ Pesanan berhasil dibatalkan"
        );


    }







    return(

        <>


        <Navbar />



        <main className="orders-page">


            <h1>
                📦 Pesanan Saya
            </h1>





            {
                loading ?

                (

                    <h3>
                        Memuat pesanan...
                    </h3>

                )

                :



                orders.length === 0 ?


                (

                    <div className="empty-order">

                        <h2>
                            Belum ada pesanan
                        </h2>


                        <p>
                            Yuk belanja produk favorit kamu
                        </p>


                    </div>

                )



                :



                (

                <div className="orders-list">


                {
                    orders.map(order=>(


                    <div
                        className="order-card"
                        key={order.id}
                    >



                        <div className="order-top">


                            <div>

                                <h3>
                                    Pesanan #{order.id}
                                </h3>


                                <p>

                                    {order.created_at || "-"}

                                </p>


                            </div>





                            <span
                                className={
                                    order.status === "Dibatalkan"

                                    ?

                                    "cancel"

                                    :

                                    "waiting"
                                }
                            >

                                {order.status}

                            </span>


                        </div>







                        <div className="order-products">


                        {
                            order.items?.map(item=>(


                            <div
                                className="order-product"
                                key={item.id}
                            >


                                <div>


                                    <h4>
                                        Produk #{item.product_id}
                                    </h4>


                                    <p>
                                        Qty : {item.qty}
                                    </p>


                                    <small>

                                        Rp {Number(item.price)
                                        .toLocaleString("id-ID")}

                                    </small>


                                </div>



                            </div>


                            ))

                        }


                        </div>








                        <div className="order-bottom">


                            <b>

                                Total:

                                {" "}

                                Rp {Number(order.total)
                                .toLocaleString("id-ID")}

                            </b>





                            <div>


                                <button

                                    onClick={()=> 
                                        setSelectedOrder(order)
                                    }

                                >

                                    <FiEye/>

                                    Detail

                                </button>





                                {
                                    order.status !== "Dibatalkan"

                                    &&

                                    (

                                    <button

                                        className="cancel-btn"

                                        onClick={()=> 
                                            cancelOrder(order.id)
                                        }

                                    >

                                        <FiXCircle/>

                                        Batalkan


                                    </button>

                                    )

                                }



                            </div>


                        </div>





                    </div>


                    ))

                }



                </div>


                )

            }









            {
                selectedOrder && (


                <div className="order-modal">


                    <div className="modal-box">



                        <button

                            className="close-modal"

                            onClick={()=>
                                setSelectedOrder(null)
                            }

                        >

                            <FiX/>

                        </button>




                        <h2>
                            Detail Pesanan
                        </h2>





                        <p>

                            ID:
                            {" "}
                            {selectedOrder.id}

                        </p>





                        <p>

                            Status:
                            {" "}
                            {selectedOrder.status}

                        </p>





                        <p>

                            Pembayaran:
                            {" "}
                            {selectedOrder.payment}

                            {
                                selectedOrder.bank &&
                                ` (${selectedOrder.bank})`
                            }

                        </p>





                        <p>

                            Alamat:
                            {" "}
                            {selectedOrder.address}

                        </p>




                        <hr/>





                        {
                            selectedOrder.items?.map(item=>(


                            <div

                                className="modal-product"

                                key={item.id}

                            >


                                <div>


                                    <h4>
                                        Produk #{item.product_id}
                                    </h4>


                                    <span>

                                        Qty:
                                        {" "}
                                        {item.qty}

                                    </span>


                                </div>


                            </div>


                            ))

                        }






                        <h3>

                            Total:

                            {" "}

                            Rp {Number(selectedOrder.total)
                            .toLocaleString("id-ID")}


                        </h3>






                    </div>


                </div>


                )

            }





        </main>



        </>

    );

}


export default Orders;