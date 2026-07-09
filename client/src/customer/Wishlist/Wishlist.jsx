import { useStore } from "../../context/StoreContext";
import "./Wishlist.css";


function Wishlist(){

    const {
        wishlist,
        toggleWishlist
    } = useStore();


    return (

        <div className="wishlist-page">

            <h1>
                Wishlist 🤍
            </h1>


            {
                wishlist.length === 0 ? (

                    <p>
                        Belum ada produk favorit
                    </p>

                ) : (

                    <div className="wishlist-grid">

                        {
                            wishlist.map((item)=>(

                                <div 
                                className="wishlist-card"
                                key={item.id}
                                >

                                    <img
                                    src={item.image}
                                    alt={item.name}
                                    />


                                    <h3>
                                        {item.brand}
                                    </h3>


                                    <p>
                                        {item.name}
                                    </p>


                                    <b>
                                        Rp {item.price.toLocaleString("id-ID")}
                                    </b>


                                    <button
                                    onClick={() => toggleWishlist(item)}
                                    >
                                        Hapus 🤍
                                    </button>


                                </div>

                            ))
                        }

                    </div>

                )
            }


        </div>

    );

}


export default Wishlist;