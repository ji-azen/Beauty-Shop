import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import api from "../../api/axios";

import {
    FiTrash2,
    FiPlus,
    FiMinus
} from "react-icons/fi";

import "./Cart.css";

function Cart() {

    const [cart, setCart] = useState([]);

    const [loading, setLoading] = useState(true);

    // =========================
    // GET CART
    // =========================

    async function getCart() {

        const token = localStorage.getItem("token");

        if (!token) {

            setLoading(false);

            return;

        }

        try {

            const response = await api.get(

                "/cart",

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            setCart(response.data.data);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    }

    // =========================
    // DELETE CART
    // =========================

    async function deleteCart(id) {

        const token = localStorage.getItem("token");

        try {

            await api.delete(

                `/cart/${id}`,

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            getCart();

        }

        catch (error) {

            console.log(error);

            alert("Gagal menghapus produk");

        }

    }

    // =========================
    // UPDATE QUANTITY
    // =========================

    async function updateQuantity(id, quantity) {

    console.log(
        "KIRIM UPDATE",
        id,
        quantity
    );

    const token = localStorage.getItem("token");

    try {

        const response = await api.put(
            `/cart/${id}`,
            {
                quantity
            },
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );


        console.log(
            "HASIL UPDATE",
            response.data
        );


        getCart();


    }catch(error){

        console.log(error);

    }

}

    useEffect(() => {

        async function fetchCart() {

            await getCart();

        }

        fetchCart();

    }, []);

    // =========================
    // TOTAL
    // =========================

    const subtotal = cart.reduce(

        (total, item) =>

            total +

            Number(item.price) *

            Number(item.quantity),

        0

    );

    return (

        <>

            <Navbar />

            <main className="cart-page">

                <div className="cart-title">

                    <h1>

                        🛒 Keranjang Saya

                    </h1>

                    <h3>

                        {cart.length} Produk

                    </h3>

                </div>

                {

                    loading ?

                    (

                        <h2>

                            Memuat Keranjang...

                        </h2>

                    )

                    :

                    cart.length === 0 ?

                    (

                        <div className="empty-cart">

                            <h2>

                                Keranjang masih kosong 😢

                            </h2>

                            <p>

                                Yuk belanja dulu 🌻

                            </p>

                        </div>

                    )

                    :

                    (

                        <div className="cart-container">

                            <div className="cart-list">

                                {

                                    cart.map(item => (

                                        <div

                                            className="cart-card"

                                            key={item.id}

                                        >

                                            <img

                                                src={`http://localhost:5000${item.image}`}

                                                alt={item.name}

                                            />

                                            <div className="cart-info">

                                                <h3>

                                                    {item.name}

                                                </h3>

                                                <p className="cart-brand">

                                                    {item.brand}

                                                </p>

                                                <div className="cart-price">

                                                    Rp {Number(item.price).toLocaleString("id-ID")}

                                                </div>

                                                <div className="cart-bottom">

                                                    <div className="qty">

                                                        <button

                                                            onClick={() =>

                                                                updateQuantity(

                                                                    item.id,

                                                                    item.quantity - 1

                                                                )

                                                            }

                                                        >

                                                            <FiMinus />

                                                        </button>

                                                        <span>

                                                            {item.quantity}

                                                        </span>

                                                        <button

                                                            onClick={() =>

                                                                updateQuantity(

                                                                    item.id,

                                                                    item.quantity + 1

                                                                )

                                                            }

                                                        >

                                                            <FiPlus />

                                                        </button>

                                                    </div>

                                                    <button

                                                        className="delete-btn"

                                                        onClick={() => {

                                                            const confirmDelete = window.confirm(

                                                                "Yakin ingin menghapus produk?"

                                                            );

                                                            if (confirmDelete) {

                                                                deleteCart(item.id);

                                                            }

                                                        }}

                                                    >

                                                        <FiTrash2 />

                                                        Hapus

                                                    </button>

                                                </div>

                                            </div>

                                        </div>

                                    ))

                                }

                            </div>

                            <div className="summary">

                                <h2>

                                    Ringkasan Belanja

                                </h2>

                                <div className="summary-row">

                                    <span>

                                        Subtotal

                                    </span>

                                    <span>

                                        Rp {subtotal.toLocaleString("id-ID")}

                                    </span>

                                </div>

                                <div className="summary-row">

                                    <span>

                                        Ongkir

                                    </span>

                                    <span>

                                        Gratis

                                    </span>

                                </div>

                                <hr />

                                <div className="summary-total">

                                    <span>

                                        Total

                                    </span>

                                    <span>

                                        Rp {subtotal.toLocaleString("id-ID")}

                                    </span>

                                </div>

                                <button

                                    className="checkout-btn"

                                >

                                    Checkout Sekarang

                                </button>

                            </div>

                        </div>

                    )

                }

            </main>

        </>

    );

}

export default Cart;