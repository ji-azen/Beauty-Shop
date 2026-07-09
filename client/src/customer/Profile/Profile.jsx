import Navbar from "../../components/Navbar/Navbar";
import { useStore } from "../../context/StoreContext";

import "./Profile.css";


function Profile(){

    const {
        orders = []
    } = useStore();


    return(

        <>
            <Navbar />

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
                            Customer
                        </span>

                    </div>


                    <div className="profile-info">

                        <b>
                            Email
                        </b>

                        <span>
                            -
                        </span>

                    </div>


                </div>





                <div className="order-history">


                    <h2>
                        📦 Riwayat Pesanan
                    </h2>


                    {
                        orders.length === 0 ? (

                            <p>
                                Belum ada pesanan.
                            </p>

                        ) : (


                            orders.map(order=>(

                                <div
                                    className="order-card"
                                    key={order.id}
                                >


                                    <div className="order-header">


                                        <span>
                                            {order.status}
                                        </span>


                                        <small>
                                            {order.date}
                                        </small>


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

                                                </div>


                                            </div>

                                        ))
                                    }



                                    <h3>

                                        Total:
                                        Rp {order.total.toLocaleString("id-ID")}

                                    </h3>


                                </div>

                            ))

                        )
                    }


                </div>


            </div>

        </>

    );

}


export default Profile;