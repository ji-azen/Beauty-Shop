import ProductCard from "../../components/ProductCard/ProductCard";

import Navbar from "../../components/Navbar/Navbar";

import Hero from "../../components/Hero/Hero";

import products from "../../data/products";

import { useStore } from "../../context/StoreContext";

import "./Home.css";



function Home(){


    const {

        search,

        category,

        setCategory


    } = useStore();







    const filteredProducts = products.filter(product=>{


        const matchSearch =

            product.name
            .toLowerCase()
            .includes(
                search.toLowerCase()
            )

            ||

            product.brand
            .toLowerCase()
            .includes(
                search.toLowerCase()
            );





        const matchCategory =

            category === "Semua"

            ||

            product.category === category;





        return matchSearch && matchCategory;


    });







    return(

        <>


        <Navbar />


        <Hero />




        <main className="home">



            <div className="top-bar">


                <h2>

                    Semua Produk

                </h2>



                <select

                    value={category}

                    onChange={(e)=>

                        setCategory(e.target.value)

                    }

                >

                    <option>
                        Semua
                    </option>


                    <option>
                        Skincare
                    </option>


                    <option>
                        Makeup
                    </option>


                    <option>
                        Bodycare
                    </option>


                </select>



            </div>





            <div className="product-grid">


            {

                filteredProducts.length === 0 ?


                (

                    <h3>

                        Produk tidak ditemukan 😢

                    </h3>

                )


                :


                filteredProducts.map(product=>(


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