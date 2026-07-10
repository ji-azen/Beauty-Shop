import "./Sidebar.css";


function Sidebar({

    open,

    onClose,

    category,

    setCategory

}){



    const changeCategory=(value)=>{


        if(category===value){

            setCategory("");

        }

        else{

            setCategory(value);

        }


    };





    return(

        <>


        {

            open &&

            (

                <div

                    className="overlay"

                    onClick={onClose}

                />

            )

        }





        <aside

            className={`sidebar ${open ? "active":""}`}

        >


            <h2>
                Filter Produk
            </h2>





            <div className="filter-group">


                <h4>
                    Kategori
                </h4>



                <label>

                    <input

                        type="checkbox"

                        checked={
                            category==="Skincare"
                        }

                        onChange={()=>
                            changeCategory("Skincare")
                        }

                    />

                    Skincare

                </label>





                <label>

                    <input

                        type="checkbox"

                        checked={
                            category==="Makeup"
                        }

                        onChange={()=>
                            changeCategory("Makeup")
                        }

                    />

                    Makeup

                </label>





                <label>

                    <input

                        type="checkbox"

                        checked={
                            category==="Bodycare"
                        }

                        onChange={()=>
                            changeCategory("Bodycare")
                        }

                    />

                    Bodycare

                </label>



            </div>


        </aside>


        </>


    );

}


export default Sidebar;