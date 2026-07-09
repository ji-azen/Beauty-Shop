import { createContext, useState } from "react";

const StoreContext = createContext();

function StoreProvider({ children }) {

    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);


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
                        qty:item.qty + 1
                    }
                    : item
                );

            }

            return [
                ...prev,
                {
                    ...product,
                    qty:1
                }
            ];

        });

    };


    const toggleWishlist = (product)=>{

        const exist = wishlist.find(
            item=>item.id===product.id
        );


        if(exist){

            setWishlist(
                wishlist.filter(
                    item=>item.id!==product.id
                )
            );

        }else{

            setWishlist([
                ...wishlist,
                product
            ]);

        }

    };


    return (
        <StoreContext.Provider
            value={{
                cart,
                wishlist,
                addToCart,
                toggleWishlist
            }}
        >

            {children}

        </StoreContext.Provider>
    );

}


export { StoreContext, StoreProvider };