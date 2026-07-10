import { FiX } from "react-icons/fi";

import { useStore } from "../../context/StoreContext";

import "./Sidebar.css";



function Sidebar({

    open,

    onClose

}){


    const {

        category,

        setCategory

    } = useStore();





    function chooseCategory(value){


        setCategory(value);


        onClose();


    }






    return(


        <>


        {

            open && (

                <div

                    className="sidebar-overlay"

                    onClick={onClose}

                >

                </div>

            )

        }







        <aside

            className={

                open

                ?

                "sidebar active"

                :

                "sidebar"

            }

        >





            <div className="sidebar-header">


                <h2>

                    Filter Produk

                </h2>



                <button

                    onClick={onClose}

                >

                    <FiX />

                </button>


            </div>








            <div className="filter-list">



                <button

                    className={

                        category==="Semua"

                        ?

                        "active-filter"

                        :

                        ""

                    }

                    onClick={()=>chooseCategory("Semua")}

                >

                    Semua Produk

                </button>







                <button

                    className={

                        category==="Skincare"

                        ?

                        "active-filter"

                        :

                        ""

                    }

                    onClick={()=>chooseCategory("Skincare")}

                >

                    Skincare

                </button>







                <button

                    className={

                        category==="Makeup"

                        ?

                        "active-filter"

                        :

                        ""

                    }

                    onClick={()=>chooseCategory("Makeup")}

                >

                    Makeup

                </button>








                <button

                    className={

                        category==="Bodycare"

                        ?

                        "active-filter"

                        :

                        ""

                    }

                    onClick={()=>chooseCategory("Bodycare")}

                >

                    Bodycare

                </button>



            </div>






        </aside>





        </>


    );


}



export default Sidebar;