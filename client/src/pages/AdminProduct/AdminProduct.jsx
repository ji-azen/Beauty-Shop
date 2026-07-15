import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    FiPlus,
    FiEdit2,
    FiTrash2,
    FiSearch,
    FiArrowLeft,
} from "react-icons/fi";

import Navbar from "../../components/Navbar/Navbar";
import api from "../../api/axios";

import "./AdminProduct.css";

function AdminProduct() {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({

    category_id: "",

    brand: "",

    name: "",

    description: "",

    price: "",

    stock: "",

    image: ""

});

    async function getProducts() {

        try {

            const response = await api.get("/products");

            setProducts(response.data.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    }

    async function deleteProduct(id) {

        const confirmDelete = window.confirm(
            "Yakin ingin menghapus produk ini?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/products/${id}`);

            getProducts();

        } catch (error) {

            console.log(error);

            alert("Gagal menghapus produk");

        }

    }

    function handleChange(e) {

    setForm({

        ...form,

        [e.target.name]:e.target.value

    });

}

async function addProduct(){

    try{

        await api.post(

            "/products",

            form

        );

        alert("Produk berhasil ditambahkan");

        setShowModal(false);

        resetForm();

        getProducts();

    }

    catch(error){

        console.log(error);

        alert("Gagal menambah produk");

    }

}

async function updateProduct(){

    try{

        await api.put(

            `/products/${editingId}`,

            form

        );

        alert("Produk berhasil diupdate");

        setShowModal(false);

        resetForm();

        getProducts();

    }

    catch(error){

        console.log(error);

        alert("Gagal update produk");

    }

}

function resetForm(){

    setEditingId(null);

    setForm({

        category_id:"",

        brand:"",

        name:"",

        description:"",

        price:"",

        stock:"",

        image:""

    });

}

function editProduct(product){

    setEditingId(product.id);

    setForm({

        category_id:product.category_id || "",

        brand:product.brand,

        name:product.name,

        description:product.description,

        price:product.price,

        stock:product.stock,

        image:product.image

    });

    setShowModal(true);

}

    useEffect(() => {

        async function fetchProducts() {
        await getProducts();
    }

    fetchProducts();


    }, []);

    const filteredProducts = products.filter((product) =>

        product.name
            .toLowerCase()
            .includes(search.toLowerCase())

    );

    return (

        <>
            <Navbar />

            <main className="admin-page">

                <div className="latest-header">

                    <div>

                        <h1>
                            🛍️ Admin Products
                        </h1>

                        <p>
                            Kelola seluruh produk toko.
                        </p>

                    </div>

                    <Link
                        to="/admin"
                        className="back-button"
                    >
                        <FiArrowLeft />

                        Dashboard
                    </Link>

                </div>

                <div className="top-action">

                    <div className="search-box">

                        <FiSearch />

                        <input
                            type="text"
                            placeholder="Cari produk..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                    </div>

                    <button

    className="add-button"

    onClick={()=>{

        resetForm();

        setShowModal(true);

    }}

>

    <FiPlus/>

    Tambah Produk

</button>

                </div>

                {loading ?

                    (

                        <h3>Memuat Produk...</h3>

                    )

                    :

                    (

                        <div className="table-card">

                            <table className="admin-table">

                                <thead>

                                    <tr>

                                    <th>ID</th>

                                    <th>Brand</th>

                                    <th>Produk</th>

                                    <th>Harga</th>

                                    <th>Stok</th>

                                    <th>Aksi</th>

                                    </tr>
                                </thead>

                                <tbody>

                                    {

                                        filteredProducts.map((product) => (

                                            <tr key={product.id}>

                                                <td>

                                                    #{product.id}

                                                </td>

                                                <td>

                                                    {product.brand}

                                                </td>

                                                <td>

                                                    {product.name}

                                                </td>

                                                <td>

                                                    Rp {Number(product.price).toLocaleString("id-ID")}

                                                </td>

                                                <td>

                                                    {product.stock}

                                                </td>

                                                <td>

                                                    <div className="action-buttons">

                                                       <button

                                                       className="edit-btn"

                                                       onClick={()=>editProduct(product)}
       
                                                       >

                                                       <FiEdit2 />

                                                       </button>

         
                                                       <button

                                                       className="delete-btn"

                                                       onClick={() =>
                                                       deleteProduct(product.id)
                                                       }

                                                       >

                                                       <FiTrash2 />

</button>

                                                    </div>

                                                </td>

                                            </tr>

                                        ))

                                    }

                                </tbody>

                            </table>

                        </div>

                    )

                }
{

showModal && (

<div className="modal-overlay">

<div className="modal-box">

<button

className="close-modal"

onClick={()=>{

    setShowModal(false);

    resetForm();

}}

>

    ✕


</button>

<h2>

    🌻{" "}

    {editingId ? "Edit Produk" : "Tambah Produk"}

</h2>

<input

type="text"

name="brand"

placeholder="Brand"

value={form.brand}

onChange={handleChange}

/>

<input

type="text"

name="name"

placeholder="Nama Produk"

value={form.name}

onChange={handleChange}

/>

<input

type="number"

name="price"

placeholder="Harga"

value={form.price}

onChange={handleChange}

/>

<input

type="number"

name="stock"

placeholder="Stok"

value={form.stock}

onChange={handleChange}

/>

<textarea

name="description"

placeholder="Deskripsi"

value={form.description}

onChange={handleChange}

/>

<input

type="text"

name="image"

placeholder="URL Gambar"

value={form.image}

onChange={handleChange}

/>

<div className="modal-buttons">

<button

className="cancel-btn"

onClick={()=>{

setShowModal(false);

resetForm();

}}

>

Batal

</button>

<button

className="save-btn"

onClick={

editingId

?

updateProduct

:

addProduct

}

>

{

editingId

?

"Simpan Perubahan"

:

"Tambah Produk"

}

</button>

</div>

</div>

</div>

)

}
            </main>

        </>

    );

}

export default AdminProduct;