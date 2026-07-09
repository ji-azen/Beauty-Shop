import { useStore } from "../../context/StoreContext";
import "./Cart.css";


function Cart(){

    const {
        cart,
        increaseQty,
        decreaseQty,
        removeFromCart
    } = useStore();


    const total = cart.reduce(
        (sum, item) =>
        sum + (item.price * item.qty),
        0
    );


    return (

        <div className="cart-page">

            <h1>
                Keranjang Belanja
            </h1>


            {
                cart.length === 0 ? (

                    <p>
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


                                <div className="cart-info">

                                    <h3>
                                        {item.brand}
                                    </h3>

                                    <p>
                                        {item.name}
                                    </p>


                                    <b>
                                        Rp {item.price.toLocaleString("id-ID")}
                                    </b>


                                    <div className="qty">

                                        <button
                                        onClick={() => decreaseQty(item.id)}
                                        >
                                            -
                                        </button>


                                        <span>
                                            {item.qty}
                                        </span>


                                        <button
                                        onClick={() => increaseQty(item.id)}
                                        >
                                            +
                                        </button>


                                    </div>


                                    <button
                                    className="delete"
                                    onClick={() => removeFromCart(item.id)}
                                    >
                                        Hapus
                                    </button>


                                </div>


                            </div>

                        ))
                    }

                    </div>


                    <div className="cart-total">

                        <h2>
                            Total:
                            Rp {total.toLocaleString("id-ID")}
                        </h2>


                        <button>
                            Checkout
                        </button>

                    </div>


                    </>

                )
            }


        </div>

    );

}


export default Cart;