import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { useStore } from "../../context/StoreContext";
import "./Checkout.css";

function Checkout(){
    const navigate = useNavigate();
    const {
        checkoutItems,
        setOrders,
        setCheckoutItems,
        removeCheckoutItems,
        showMessage
    } = useStore();
    const [address,setAddress] = useState("");
    const [bank,setBank] = useState("");
    const total = checkoutItems.reduce(
        (sum,item)=>sum + (item.price * item.qty),
        0
    );

    function createOrder(){
        if(
            !address ||
            !bank
        ){
            alert(
                "Lengkapi alamat dan pilih bank dulu"
            );
            return;
        }

        const order = {
            id:"BS-"+new Date().getTime(),
            items:checkoutItems,
            address,
            payment:"Transfer Bank",
            bank,
            total,
            status:"Menunggu Pembayaran",
            date:new Date().toLocaleString("id-ID")
        };
        setOrders(prev=>[
            order,
            ...prev
        ]);
        removeCheckoutItems(checkoutItems);
        setCheckoutItems([]);
        showMessage(
            "🎉 Pesanan berhasil dibuat!"
        );
        setTimeout(()=>{
            navigate("/orders");
        },1500);
    }

    return(
        <>
        <Navbar />
        <main className="checkout-page">
            <h1>
                Checkout
            </h1>
            <div className="checkout-container">
                <section className="checkout-products">
                    <h2>
                        Produk Pesanan
                    </h2>
                    {
                        checkoutItems.length === 0 ? (
                            <p>
                                Tidak ada produk dipilih
                            </p>
                        )
                        :
                        checkoutItems.map(item=>(
                            <div
                                className="checkout-item"
                                key={item.id}
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                />
                                <div>
                                    <h3>
                                        {item.brand}
                                    </h3>

                                    <p>
                                        {item.name}
                                    </p>

                                    <p>
                                        Qty: {item.qty}
                                    </p>

                                    <b>
                                        Rp {(item.price * item.qty).toLocaleString("id-ID")}
                                    </b>
                                </div>
                            </div>
                        ))
                    }
                </section>

                <section className="checkout-form">

                    <h2>
                        Alamat Pengiriman
                    </h2>

                    <textarea
                        placeholder="Masukkan alamat lengkap..."
                        value={address}
                        onChange={(e)=>
                            setAddress(e.target.value)
                        }
                    />

                    <h2>
                        Pembayaran
                    </h2>

                    <div className="payment-box">

                        <h3>
                            Transfer Bank
                        </h3>

                        <p>
                            Pilih rekening pembayaran
                        </p>

                        <label>
                            <input
                                type="radio"
                                name="bank"
                                onChange={()=>setBank("BCA")}
                            />
                            DANA
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="bank"
                                onChange={()=>setBank("BRI")}
                            />
                            OVO
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="bank"
                                onChange={()=>setBank("BRI")}
                            />
                            ShopeePay
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="bank"
                                onChange={()=>setBank("Mandiri")}
                            />
                            Mandiri
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="bank"
                                onChange={()=>setBank("BNI")}
                            />
                            BRI
                        </label>
                    </div>

                    <div className="checkout-total">
                        <span>
                            Total:
                        </span>
                        <b>
                            Rp {total.toLocaleString("id-ID")}
                        </b>
                    </div>
                    <button
                        onClick={createOrder}
                    >
                        Buat Pesanan
                    </button>
                </section>
            </div>
        </main>
        </>
    );
}

export default Checkout;