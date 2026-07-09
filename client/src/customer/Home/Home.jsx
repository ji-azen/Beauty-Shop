import ProductCard from "../../components/ProductCard/ProductCard";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";

import products from "../../data/products";

import "./Home.css";


function Home() {

    return (

        <>

            <Navbar />

            <Hero />


            <main className="home">


                <div className="top-bar">

                    <h2>
                        Semua Produk
                    </h2>


                    <select>

                        <option>
                            Urutkan
                        </option>

                        <option>
                            Terbaru
                        </option>

                        <option>
                            Harga Terendah
                        </option>

                        <option>
                            Harga Tertinggi
                        </option>

                    </select>


                </div>



                <div className="product-grid">

                    {
                        products.map((product) => (

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