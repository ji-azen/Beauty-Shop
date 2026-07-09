import ProductCard from "../../components/ProductCard/ProductCard";
import Navbar from "../../components/Navbar/Navbar";

import "./Home.css";

function Home() {
  const products = [
  {
    id: 1,
    name: "Wardah UV Shield",
    price: 45000,
    image: "https://placehold.co/300x300"
  },
  {
    id: 2,
    name: "Emina Bright Stuff",
    price: 38000,
    image: "https://placehold.co/300x300"
  },
  {
    id: 3,
    name: "Skintific Moisturizer",
    price: 125000,
    image: "https://placehold.co/300x300"
  }
];
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
                {products.map((product) => (
                  <ProductCard
                   key={product.id}
                   product={product}
                  />
               ))}
               </div>

            </main>

        </>

    );
}

export default Home;