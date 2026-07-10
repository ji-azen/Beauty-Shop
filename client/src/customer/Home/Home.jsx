import { useState } from "react";


import Navbar from "../../components/Navbar/Navbar";

import Hero from "../../components/Hero/Hero";

import ProductCard from "../../components/ProductCard/ProductCard";


import products from "../../data/products";


import "./Home.css";



function Home(){


    const [search,setSearch]=useState("");

    const [category,setCategory]=useState("");

    const [sort,setSort]=useState("");






    let result = products.filter(product=>{


        const keyword = search.toLowerCase();



        return(

            product.name
            .toLowerCase()
            .includes(keyword)


            ||

            product.brand
            .toLowerCase()
            .includes(keyword)

        );


    });





    if(category){


        result = result.filter(product=>

            product.category===category

        );


    }






    if(sort==="low"){


        result.sort(

            (a,b)=>a.price-b.price

        );


    }




    if(sort==="high"){


        result.sort(

            (a,b)=>b.price-a.price

        );


    }







    return(

        <>


        <Navbar

            search={search}

            setSearch={setSearch}

            category={category}

            setCategory={setCategory}

        />





        <Hero/>






        <main className="home">



            <div className="top-bar">


                <h2>
                    Semua Produk
                </h2>



                <select

                    value={sort}

                    onChange={
                        e=>setSort(e.target.value)
                    }

                >

                    <option value="">
                        Urutkan
                    </option>


                    <option value="low">
                        Harga Terendah
                    </option>



                    <option value="high">
                        Harga Tertinggi
                    </option>


                </select>



            </div>






            <div className="product-grid">


                {

                    result.map(product=>(


                        <ProductCard

                            key={product.id}

                            product={product}

                        />


                    ))

                }



            </div>



        </main>



        </>

    );

}


export default Home;