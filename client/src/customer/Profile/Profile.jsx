import Navbar from "../../components/Navbar/Navbar";

import { useAuth } from "../../context/AuthContext";

import { useStore } from "../../context/StoreContext";

import "./Profile.css";



function Profile(){


    const {

        user

    } = useAuth();



    const {

        orders

    } = useStore();





    return(

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




            </section>







            <section className="order-history">


                <h2>

                    📦 Pesanan Terakhir

                </h2>



                {

                    orders.length === 0 ?


                    (

                        <p>

                            Belum ada pesanan

                        </p>

                    )


                    :


                    orders.slice(0,3).map(order=>(


                        <div

                            className="profile-order"

                            key={order.id}

                        >



                            <div>

                                <b>

                                    Pesanan #{order.id.slice(0,8)}

                                </b>


                                <p>

                                    {order.status}

                                </p>

                            </div>



                            <strong>

                                Rp {order.total.toLocaleString("id-ID")}

                            </strong>



                        </div>


                    ))

                }



            </section>



        </main>



        </>

    );


}



export default Profile;