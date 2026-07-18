import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import api from "../../api/axios";
import { useStore } from "../../context/StoreContext";
import "./Home.css";

function Home() {

    const {

        search,

        category,

        setCategory

    } = useStore();

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function getProducts() {

            try {

                const response = await api.get(

                    "/products"

                );

                setProducts(

                    response.data.data

                );

            }

            catch (error) {

                console.log(error);

            }

            finally {

                setLoading(false);

            }

        }

        getProducts();

    }, []);

    const filteredProducts = products.filter(

        (product) => {

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

            return (

                matchSearch &&

                matchCategory

            );

        }

    );

    return (

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

                            setCategory(

                                e.target.value

                            )

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

                            Body Care

                        </option>

                        <option>

                            Hair Care

                        </option>

                        <option>

                            Fragrance

                        </option>

                    </select>

                </div>

                {

                    loading

                    ?

                    (

                        <h2>

                            Memuat Produk...

                        </h2>

                    )

                    :

                    (

                        <div className="product-grid">

                            {

                                filteredProducts.length === 0

                                ?

                                (

                                    <h3>

                                        Produk tidak ditemukan 😢

                                    </h3>

                                )

                                :

                                filteredProducts.map(

                                    (product)=>(

                                        <ProductCard

                                            key={product.id}

                                            product={product}

                                        />

                                    )

                                )

                            }

                        </div>

                    )

                }

            </main>

        </>

    );

}

export default Home;