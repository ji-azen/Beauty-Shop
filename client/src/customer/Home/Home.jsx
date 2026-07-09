import ProductCard from "../../components/ProductCard/ProductCard";
import Navbar from "../../components/Navbar/Navbar";

import "./Home.css";

function Home() {
  const products = [
  {
    id: 1,
    brand: "Wardah",
    name: "UV Shield Sunscreen",
    price: 45000,
    rating: 4.8,
    review: 120,
    category: "Skincare",
    image: "https://placehold.co/300x300"
  },

  {
    id: 2,
    brand: "Emina",
    name: "Bright Stuff Face Wash",
    price: 38000,
    rating: 4.7,
    review: 95,
    category: "Skincare",
    image: "https://placehold.co/300x300"
  },

  {
    id: 3,
    brand: "Skintific",
    name: "5X Ceramide Moisturizer",
    price: 125000,
    rating: 4.9,
    review: 300,
    category: "Skincare",
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