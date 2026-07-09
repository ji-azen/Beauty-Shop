import { createContext, useContext, useState } from "react";


const StoreContext = createContext();


export function StoreProvider({ children }) {

    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);



    // TAMBAH KE CART
    const addToCart = (product) => {

        setCart((prev) => {

            const exist = prev.find(
                item => item.id === product.id
            );


            if (exist) {

                return prev.map(item =>
                    item.id === product.id
                    ? {
                        ...item,
                        qty: item.qty + 1
                    }
                    : item
                );

            }


            return [
                ...prev,
                {
                    ...product,
                    qty: 1
                }
            ];

        });

    };



    // WISHLIST
    const toggleWishlist = (product) => {

        const exist = wishlist.find(
            item => item.id === product.id
        );


        if (exist) {

            setWishlist(
                wishlist.filter(
                    item => item.id !== product.id
                )
            );

        } else {

            setWishlist([
                ...wishlist,
                product
            ]);

        }

    };



    // TAMBAH JUMLAH CART
    const increaseQty = (id) => {

        setCart((prev) =>
            prev.map(item =>
                item.id === id
                ? {
                    ...item,
                    qty: item.qty + 1
                }
                : item
            )
        );

    };



    // KURANGI JUMLAH CART
    const decreaseQty = (id) => {

        setCart((prev) =>
            prev.map(item =>
                item.id === id && item.qty > 1
                ? {
                    ...item,
                    qty: item.qty - 1
                }
                : item
            )
        );

    };



    // HAPUS CART
    const removeFromCart = (id) => {

        setCart((prev) =>
            prev.filter(
                item => item.id !== id
            )
        );

    };



    return (

        <StoreContext.Provider

            value={{

                cart,
                wishlist,

                addToCart,
                toggleWishlist,

                increaseQty,
                decreaseQty,
                removeFromCart

            }}

        >

            {children}

        </StoreContext.Provider>

    );

}



export function useStore() {

    return useContext(StoreContext);

}