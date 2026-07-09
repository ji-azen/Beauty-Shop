import ProductCard from "../../components/ProductCard/ProductCard";
import Navbar from "../../components/Navbar/Navbar";

import "./Home.css";

function Home() {
    return (

        <>

            <Navbar />

            <main className="home">

                <div className="top-bar">

                    <h2>Semua Produk</h2>

                    <select>

                        <option>Urutkan</option>

                        <option>Terbaru</option>

                        <option>Harga Terendah</option>

                        <option>Harga Tertinggi</option>

                        <option>Terlaris</option>

                        <option>Rating Tertinggi</option>

                    </select>

                </div>

                <div className="product-grid">

                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />

                </div>
                
            </main>

        </>

    );
}

export default Home;