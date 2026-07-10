import Navbar from "../../components/Navbar/Navbar";

import { useStore } from "../../context/StoreContext";

import { useAuth } from "../../context/AuthContext";

import "./Profile.css";


function Profile(){


    const {
        orders=[]
    } = useStore();



    const {
        user
    } = useAuth();




    return(

        <>

            <Navbar/>




            <div className="profile-page">





                <div className="profile-card">


                    <h1>
                        👤 Profil Saya
                    </h1>



                    <div className="profile-info">

                        <b>
                            Nama
                        </b>


                        <span>
                            {user?.name || "Customer"}
                        </span>


                    </div>





                    <div className="profile-info">

                        <b>
                            Email
                        </b>


                        <span>
                            {user?.email || "-"}
                        </span>


                    </div>




                </div>









                <div className="order-history">



                    <h2>
                        📦 Riwayat Pesanan
                    </h2>






                    {
                        orders.length === 0 ?


                        (

                            <div className="empty-order">

                                <p>
                                    Belum ada pesanan.
                                </p>


                            </div>

                        )


                        :


                        orders.map(order=>(


                            <div

                                className="order-card"

                                key={order.id}

                            >




                                <div className="order-header">


                                    <div>

                                        <b>
                                            {order.id}
                                        </b>


                                        <small>
                                            {order.date}
                                        </small>


                                    </div>




                                    <span>

                                        {order.status}

                                    </span>



                                </div>







                                {

                                    order.items.map(item=>(


                                        <div

                                            className="order-item"

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








                                <div className="order-total">


                                    <span>
                                        Total
                                    </span>


                                    <b>

                                        Rp {order.total.toLocaleString("id-ID")}

                                    </b>


                                </div>




                            </div>


                        ))

                    }



                </div>





            </div>



        </>

    );

}


export default Profile;