import { useState } from "react";

import Navbar from "../../components/Navbar/Navbar";

import {
    FiXCircle,
    FiEye,
    FiX
} from "react-icons/fi";

import { useStore } from "../../context/StoreContext";

import "./Orders.css";


function Orders(){


    const {
        orders,
        setOrders,
        showMessage
    } = useStore();


    const [selectedOrder,setSelectedOrder] = useState(null);





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
                orders.length === 0 ? (

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
                                            {order.date}
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
                                    order.items.map(item=>(


                                        <div
                                            className="order-product"
                                            key={item.id}
                                        >

                                            <img
                                                src={item.image}
                                                alt={item.name}
                                            />


                                            <div>

                                                <h4>
                                                    {item.brand}
                                                </h4>


                                                <p>
                                                    {item.name}
                                                </p>


                                                <small>
                                                    Qty: {item.qty}
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

                                        Rp {order.total.toLocaleString("id-ID")}

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

                                Tanggal:

                                {" "}

                                {selectedOrder.date}

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





                            <hr />





                            {
                                selectedOrder.items.map(item=>(


                                    <div
                                        className="modal-product"
                                        key={item.id}
                                    >

                                        <img
                                            src={item.image}
                                            alt={item.name}
                                        />


                                        <div>

                                            <h4>
                                                {item.brand}
                                            </h4>

                                            <p>
                                                {item.name}
                                            </p>

                                            <span>
                                                Qty: {item.qty}
                                            </span>

                                        </div>


                                    </div>


                                ))
                            }




                            <h3>

                                Total:

                                Rp {selectedOrder.total.toLocaleString("id-ID")}

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