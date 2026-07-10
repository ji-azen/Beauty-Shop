import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { useStore } from "../../context/StoreContext";
import CartItem from "./CartItem";
import "./Cart.css";

function Cart(){
    const navigate = useNavigate();

    const {
        cart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        setCheckoutItems
    } = useStore();

    const [selected,setSelected] = useState([]);
    const [openDelete,setOpenDelete] = useState(null);

    const toggleSelect = (id)=>{
        if(selected.includes(id)){
            setSelected(
                selected.filter(
                    item => item !== id
                )
            );
        }else{
            setSelected([
                ...selected,
                id
            ]);
        }
    };

    const selectedItems = cart.filter(
        item => selected.includes(item.id)
    );

    const total = selectedItems.reduce(
        (sum,item)=>
        sum + (item.price * item.qty),
        0
    );

    const handleCheckout = ()=>{
        setCheckoutItems(selectedItems);
        navigate("/checkout");
    };

    return(
        <>
        <Navbar />
        <div className="cart-page">
            <h1>
                🛒 Keranjang Belanja
            </h1>
            {
                cart.length === 0 ? (
                    <div className="empty-cart">
                        <h2>
                            Keranjang masih kosong 😢
                        </h2>
                        <p>
                            Yuk pilih produk favorit kamu
                        </p>
                    </div>
                )
                :
                (
                <>
                <div className="cart-list">
                    {
                        cart.map(item => (
                            <CartItem
                                key={item.id}
                                item={item}
                                selected={selected}
                                toggleSelect={toggleSelect}
                                increaseQty={increaseQty}
                                decreaseQty={decreaseQty}
                                removeFromCart={removeFromCart}
                                openDelete={openDelete}
                                setOpenDelete={setOpenDelete}
                            />
                        ))
                    }
                </div>

                <div className="checkout-bar">
                    <div>
                        <p>
                            Dipilih:
                            {" "}
                            {selected.length}
                            {" "}
                            produk
                        </p>

                        <h2>
                            Rp {total.toLocaleString("id-ID")}
                        </h2>
                    </div>

                    <button
                        onClick={handleCheckout}
                        disabled={selected.length === 0}
                    >
                        Checkout
                    </button>
                </div>
                </>
                )
            }
        </div>
        </>
    );
}

export default Cart;