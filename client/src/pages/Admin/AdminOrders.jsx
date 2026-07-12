import { 
    useEffect, 
    useState 
} from "react";

import { 
    Link 
} from "react-router-dom";


import Navbar from "../../components/Navbar/Navbar";

import api from "../../api/axios";

import {
    FiPackage,
    FiArrowLeft
} from "react-icons/fi";


import "./AdminDashboard.css";



function Order(){


    const [orders,setOrders] = useState([]);


    const [loading,setLoading] = useState(true);





    async function getOrders(){


        try{


            const response = await api.get(
                "/orders"
            );


            setOrders(
                response.data.data
            );



        }catch(error){


            console.log(
                "Order error:",
                error
            );


        }finally{


            setLoading(false);


        }


    }






    async function updateStatus(id,status){


        try{


            await api.put(

                `/orders/${id}/status`,

                {
                    status
                }

            );



            getOrders();



        }catch(error){


            console.log(
                "Update status error:",
                error
            );


            alert(
                "Gagal mengubah status"
            );


        }


    }






    useEffect(()=>{


      const loadOrders = async()=>{

        await getOrders();

    };


    loadOrders();



    },[]);







    return(

        <>


        <Navbar />



        <main className="admin-page">



            <div className="latest-header">


                <h1>

                    <FiPackage />

                    {" "}

                    Kelola Pesanan

                </h1>




                <Link to="/admin">


                    <FiArrowLeft />

                    {" "}

                    Dashboard


                </Link>


            </div>







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

                <div className="dashboard-card">


                    <h3>
                        Belum ada pesanan
                    </h3>


                </div>


            )


            :



            (


            <table className="admin-table">


                <thead>


                    <tr>


                        <th>
                            ID
                        </th>


                        <th>
                            Customer
                        </th>


                        <th>
                            Email
                        </th>


                        <th>
                            Pembayaran
                        </th>


                        <th>
                            Total
                        </th>


                        <th>
                            Status
                        </th>


                    </tr>


                </thead>





                <tbody>


                {

                    orders.map(order=>(


                        <tr 
                            key={order.id}
                        >



                            <td>

                                #

                                {order.id}

                            </td>





                            <td>


                                {order.name}



                            </td>





                            <td>


                                {order.email}



                            </td>





                            <td>


                                {order.payment}



                                {

                                    order.bank &&

                                    (

                                        <>

                                        <br />

                                        <small>

                                            {order.bank}

                                        </small>


                                        </>

                                    )

                                }


                            </td>







                            <td>


                                Rp{" "}

                                {

                                Number(
                                    order.total
                                )
                                .toLocaleString(
                                    "id-ID"
                                )


                                }



                            </td>







                            <td>



                                <select



                                    className={

                                        order.status === "Selesai"

                                        ?

                                        "status-success"


                                        :


                                        order.status === "Dikirim"

                                        ?

                                        "status-send"



                                        :


                                        order.status === "Diproses"

                                        ?

                                        "status-process"



                                        :


                                        "status-wait"


                                    }



                                    value={
                                        order.status
                                    }



                                    onChange={
                                        
                                        (e)=>

                                        updateStatus(

                                            order.id,

                                            e.target.value

                                        )

                                    }



                                >



                                    <option>

                                        Menunggu Pembayaran

                                    </option>



                                    <option>

                                        Diproses

                                    </option>




                                    <option>

                                        Dikirim

                                    </option>




                                    <option>

                                        Selesai

                                    </option>



                                </select>



                            </td>





                        </tr>


                    ))


                }



                </tbody>




            </table>


            )


            }




        </main>


        </>

    );


}



export default Order;