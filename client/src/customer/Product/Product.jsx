import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import products from "../../data/products";
import "./Product.css";

function Product() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("Semua");
    const [sort, setSort] = useState("default");

    let filteredProducts = products.filter((product) => {
        const matchSearch =
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.brand.toLowerCase().includes(search.toLowerCase());

        const matchCategory =
            category === "Semua" ||
            product.category === category;
        return matchSearch && matchCategory;
    });
    switch (sort) {
        case "low":
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case "high":
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case "rating":
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        case "az":
            filteredProducts.sort((a, b) =>
                a.name.localeCompare(b.name)
            );
            break;
        default:
            break;
    }

    return (
        <>
            <Navbar />
            <div className="product-page">
                <Sidebar />
                <div className="product-content">
                    <div className="product-header">
                        <h1>Semua Produk</h1>
                        <p>
                            Temukan skincare & kosmetik favoritmu.
                        </p>
                    </div>

                    <div className="filter-box">
                        <input
                            className="search-input"
                            type="text"
                            placeholder="Cari produk..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />
                        <select
                            className="category-select"
                            value={category}
                            onChange={(e) =>
                                setCategory(e.target.value)
                            }
                        >
                            <option value="Semua">Semua</option>
                            <option value="Skincare">Skincare</option>
                            <option value="Makeup">Makeup</option>
                            <option value="Bodycare">Bodycare</option>
                        </select>

                        <select
                            className="category-select"
                            value={sort}
                            onChange={(e) =>
                                setSort(e.target.value)
                            }
                        >
                            <option value="default">
                                Urutkan
                            </option>

                            <option value="low">
                                Harga Terendah
                            </option>

                            <option value="high">
                                Harga Tertinggi
                            </option>

                            <option value="rating">
                                Rating Tertinggi
                            </option>

                            <option value="az">
                                Nama A - Z
                            </option>
                        </select>
                    </div>

                    <p
                        style={{
                            marginBottom: "20px",
                            color: "#666"
                        }}
                    >
                        Menampilkan {filteredProducts.length} produk
                    </p>
                    {
                        filteredProducts.length > 0 ? (
                            <ProductGrid
                                products={filteredProducts}
                            />
                        ) : (
                            <div
                                style={{
                                    textAlign: "center",
                                    padding: "50px"
                                }}
                            >
                                <h2>😢 Produk tidak ditemukan</h2>
                                <p>
                                    Coba gunakan kata kunci lain.
                                </p>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    );
}

export default Product;