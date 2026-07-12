import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import api from "../../api/axios";

import "./AdminDashboard.css";


function AdminDashboard(){

    const [dashboard,setDashboard] = useState({

        totalUsers:0,

        totalProducts:0,

        totalOrders:0,

        totalRevenue:0

    });


    const [loading,setLoading] = useState(true);



    async function getDashboard(){

        try{

            const response = await api.get(
                "/admin/dashboard"
            );


            console.log(
                "HASIL DASHBOARD:",
            response.data
            );


            setDashboard(
                response.data.data
            );


        }catch(error){

            console.log(
                "Dashboard error:",
                error
            );

        }finally{

            setLoading(false);

        }

    }




    useEffect(()=>{

        const loadDashboard = async () => {

        await getDashboard();

    };

    loadDashboard();

    },[]);





    return(

        <>

        <Navbar/>


        <main className="admin-page">


            <div className="latest-header">

                <h1>
                    📊 Admin Dashboard
                </h1>


                <Link to="/">
                    Home
                </Link>


            </div>




            {
                loading ?

                (

                    <h3>
                        Memuat data...
                    </h3>

                )

                :

                (

                <div className="dashboard-cards">



                    <div className="dashboard-card">

                        <h3>
                            👤 Total User
                        </h3>

                        <p>
                            {dashboard.totalUsers}
                        </p>

                    </div>





                    <div className="dashboard-card">

                        <h3>
                            🛍️ Total Produk
                        </h3>

                        <p>
                            {dashboard.totalProducts}
                        </p>

                    </div>





                    <div className="dashboard-card">

                        <h3>
                            📦 Total Order
                        </h3>

                        <p>
                            {dashboard.totalOrders}
                        </p>

                    </div>





                    <div className="dashboard-card">

                        <h3>
                            💰 Pendapatan
                        </h3>

                        <p>

                            Rp {

                            Number(
                                dashboard.totalRevenue
                            )
                            .toLocaleString(
                                "id-ID"
                            )

                            }

                        </p>

                    </div>



                </div>

                )

            }





            <div className="admin-menu">


                <Link
                    to="/admin/orders"
                    className="admin-button"
                >

                    📦 Kelola Pesanan

                </Link>



                <Link
                    to="/admin/products"
                    className="admin-button"
                >

                    🛍️ Kelola Produk

                </Link>



            </div>



        </main>

        </>

    );

}


export default AdminDashboard;