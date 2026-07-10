import {
    useEffect,
    useState
} from "react";

import Navbar from "../../components/Navbar/Navbar";

import {
    useAuth
} from "../../context/AuthContext";

import api from "../../api/axios";

import "./Profile.css";



function Profile(){


    const {
        user
    } = useAuth();



    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");




    useEffect(() => {


        if(!user){

            return;

        }



        async function getOrders(){


            try{


                const response = await api.get(
                    "/orders/my"
                );


                console.log(
                    "ORDER RESPONSE:",
                    response.data
                );



                setOrders(
                    response.data.data || []
                );



            }catch(error){


                console.log(
                    "Gagal mengambil order:",
                    error
                );


                setError(
                    "Gagal mengambil data pesanan"
                );



            }finally{


                setLoading(false);


            }


        }



        getOrders();



    }, [user]);







    return (

        <>

            <Navbar />



            <main className="profile-page">



                <section className="profile-card">


                    <h1>
                        👤 Profil Saya
                    </h1>




                    <div className="profile-row">

                        <span>
                            Nama
                        </span>


                        <b>
                            {user?.name || "-"}
                        </b>


                    </div>





                    <div className="profile-row">

                        <span>
                            Email
                        </span>


                        <b>
                            {user?.email || "-"}
                        </b>


                    </div>





                    <div className="profile-row">

                        <span>
                            Role
                        </span>


                        <b>
                            {user?.role || "-"}
                        </b>


                    </div>



                </section>







                <section className="order-history">


                    <h2>
                        📦 Riwayat Pesanan
                    </h2>





                    {
                        loading && (

                            <p>
                                Memuat pesanan...
                            </p>

                        )
                    }





                    {
                        error && (

                            <p>
                                {error}
                            </p>

                        )
                    }





                    {
                        !loading &&
                        !error &&
                        orders.length === 0 && (

                            <p>
                                Belum ada pesanan
                            </p>

                        )
                    }







                    {
                        orders.map(
                            (order) => (

                                <div
                                    className="profile-order"
                                    key={order.id}
                                >



                                    <div>


                                        <h3>
                                            Pesanan #{order.id}
                                        </h3>



                                        <p>
                                            Status:
                                            {" "}
                                            <b>
                                                {order.status}
                                            </b>
                                        </p>



                                        <p>
                                            Pembayaran:
                                            {" "}
                                            {order.payment}
                                        </p>




                                        {
                                            order.bank && (

                                                <p>
                                                    Bank:
                                                    {" "}
                                                    {order.bank}
                                                </p>

                                            )
                                        }





                                        <p>
                                            Alamat:
                                            {" "}
                                            {order.address}
                                        </p>




                                        <small>

                                            {
                                                new Date(
                                                    order.created_at
                                                ).toLocaleString(
                                                    "id-ID"
                                                )
                                            }

                                        </small>


                                    </div>






                                    <strong>

                                        Rp{" "}

                                        {
                                            Number(
                                                order.total
                                            ).toLocaleString(
                                                "id-ID"
                                            )
                                        }


                                    </strong>




                                </div>


                            )
                        )
                    }




                </section>



            </main>


        </>

    );

}



export default Profile;