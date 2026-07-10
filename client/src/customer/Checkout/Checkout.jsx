import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";

import { useStore } from "../../context/StoreContext";

import "./Checkout.css";



function Checkout(){


    const navigate = useNavigate();




    const {

        checkoutItems,

        setOrders,

        removeMultipleFromCart

    } = useStore();







    const [address,setAddress] = useState("");

    const [payment,setPayment] = useState("");







    const total = checkoutItems.reduce(


        (sum,item)=>


        sum + (item.price * item.qty),


        0


    );









    const createOrder = ()=>{



        if(!address || !payment){


            alert(
                "Lengkapi alamat dan pembayaran dulu"
            );


            return;


        }







        const order = {


            id:crypto.randomUUID(),


            items:checkoutItems,


            address:address,


            payment:payment,


            total:total,


            status:"Menunggu Pembayaran",


            date:new Date()

            .toLocaleString("id-ID")


        };








        setOrders(prev=>[

            order,

            ...prev

        ]);







        removeMultipleFromCart(


            checkoutItems.map(

                item=>item.id

            )


        );








        setTimeout(()=>{


            alert(
                "Pesanan berhasil dibuat 🎉"
            );



            navigate("/profile");



        },200);



    };








    return(


        <>


        <Navbar />






        <div className="checkout-page">






            <h1>

                Checkout 🛍️

            </h1>









            <div className="checkout-container">







                <div className="checkout-products">





                    <h2>

                        Produk Pesanan

                    </h2>







                    {


                        checkoutItems.length === 0 ?



                        (

                            <p>

                                Tidak ada produk dipilih

                            </p>


                        )



                        :



                        (


                            checkoutItems.map(item=>(



                                <div

                                    className="checkout-item"

                                    key={item.id}

                                >






                                    <img

                                        src={item.image}

                                        alt={item.name}

                                    />







                                    <div>


                                        <h3>

                                            {item.brand}

                                        </h3>



                                        <p>

                                            {item.name}

                                        </p>




                                        <p>

                                            Jumlah:

                                            {" "}

                                            {item.qty}

                                        </p>





                                        <b>

                                            Rp {(item.price * item.qty)

                                            .toLocaleString("id-ID")}

                                        </b>



                                    </div>







                                </div>



                            ))



                        )



                    }







                </div>












                <div className="checkout-form">







                    <h2>

                        Alamat Pengiriman

                    </h2>








                    <textarea


                        placeholder="Masukkan alamat lengkap..."


                        value={address}


                        onChange={

                            e=>setAddress(
                                e.target.value
                            )

                        }


                    />









                    <h2>

                        Metode Pembayaran

                    </h2>








                    <label>


                        <input


                            type="radio"


                            name="payment"


                            value="COD"


                            onChange={

                                e=>setPayment(
                                    e.target.value
                                )

                            }


                        />


                        COD


                    </label>








                    <label>


                        <input


                            type="radio"


                            name="payment"


                            value="Transfer Bank"


                            onChange={

                                e=>setPayment(
                                    e.target.value
                                )

                            }


                        />


                        Transfer Bank


                    </label>









                    <div className="checkout-total">



                        <span>

                            Total:

                        </span>



                        <b>

                            Rp {total.toLocaleString("id-ID")}

                        </b>



                    </div>









                    <button

                        onClick={createOrder}

                    >

                        Buat Pesanan

                    </button>







                </div>








            </div>







        </div>






        </>


    );


}



export default Checkout;