import Navbar from "../../components/Navbar/Navbar";
import { useStore } from "../../context/StoreContext";

import "./Cart.css";

function Cart() {

    const {
        cart
    } = useStore();


    const total = cart.reduce(
        (sum, item) => sum + (item.price * item.qty),
        0
    );


    return (

        <>

            <Navbar />

            <main className="cart-page">

                <h1>🛒 Keranjang Belanja</h1>


                {
                    cart.length === 0 ? (

                        <p className="empty">
                            Keranjang masih kosong
                        </p>

                    ) : (

                        <>

                        <div className="cart-list">

                        {
                            cart.map((item)=>(

                                <div 
                                    className="cart-item"
                                    key={item.id}
                                >

                                    <img 
                                        src={item.image}
                                        alt={item.name}
                                    />


                                    <div>

                                        <h3>
                                            {item.name}
                                        </h3>

                                        <p>
                                            Qty : {item.qty}
                                        </p>

                                        <p>
                                            Rp {item.price.toLocaleString("id-ID")}
                                        </p>

                                    </div>


                                </div>

                            ))
                        }

                        </div>


                        <h2>
                            Total :
                            Rp {total.toLocaleString("id-ID")}
                        </h2>


                        </>

                    )
                }


            </main>

        </>

    );

}

export default Cart;