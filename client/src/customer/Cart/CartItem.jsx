import "./Cart.css";

function CartItem({
    item,
    selected,
    toggleSelect,
    increaseQty,
    decreaseQty,
    removeFromCart,
    openDelete,
    setOpenDelete
}){
    const subtotal = item.price * item.qty;
    return(
        <div className="cart-item">
            <input
                type="checkbox"
                checked={selected.includes(item.id)}
                onChange={()=>toggleSelect(item.id)}
            />
            <img
                src={item.image}
                alt={item.name}
            />
            <div className="cart-info">
                <h3>
                    {item.brand}
                </h3>
                <p className="cart-name">
                    {item.name}
                </p>
                <b>
                    Rp {item.price.toLocaleString("id-ID")}
                </b>
                <div className="qty">
                    <button
                        onClick={()=>decreaseQty(item.id)}
                    >
                        -
                    </button>
                    <span>
                        {item.qty}
                    </span>
                    <button
                        onClick={()=>increaseQty(item.id)}
                    >
                        +
                    </button>
                </div>
            </div>

            <div className="subtotal">
                <span>
                    Subtotal
                </span>
                <b>
                    Rp {subtotal.toLocaleString("id-ID")}
                </b>
            </div>

            <div className="delete-area">
                <button
                    className="delete-btn"
                    onClick={()=>setOpenDelete(item.id)}
                >
                    🗑
                </button>

                {
                    openDelete === item.id &&
                    <div className="delete-confirm">
                        <p>
                            Hapus barang?
                        </p>
                        <button
                            onClick={()=>{
                                removeFromCart(item.id);
                                setOpenDelete(null);
                            }}
                        >
                            Ya
                        </button>

                        <button
                            onClick={()=>setOpenDelete(null)}
                        >
                            Tidak
                        </button>
                    </div>
                }
            </div>
        </div>
    );
}

export default CartItem;