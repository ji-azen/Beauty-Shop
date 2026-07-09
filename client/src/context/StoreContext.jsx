import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";


const StoreContext = createContext();



function getStorage(key){

    const data = localStorage.getItem(key);

    return data ? JSON.parse(data) : [];

}



export function StoreProvider({children}){


    const [cart,setCart] = useState(
        () => getStorage("cart")
    );


    const [wishlist,setWishlist] = useState(
        () => getStorage("wishlist")
    );


    const [orders,setOrders] = useState(
        () => getStorage("orders")
    );


    const [checkoutItems,setCheckoutItems] = useState([]);



    useEffect(()=>{

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

    },[cart]);



    useEffect(()=>{

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );

    },[wishlist]);



    useEffect(()=>{

        localStorage.setItem(
            "orders",
            JSON.stringify(orders)
        );

    },[orders]);





    function addToCart(product){


        setCart(prev=>{


            const exist = prev.find(
                item=>item.id === product.id
            );


            if(exist){

                return prev.map(item=>

                    item.id === product.id

                    ?

                    {
                        ...item,
                        qty:item.qty + 1
                    }

                    :

                    item

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


    }





    function toggleWishlist(product){


        setWishlist(prev=>{


            const exist = prev.find(
                item=>item.id === product.id
            );


            if(exist){

                return prev.filter(
                    item=>item.id !== product.id
                );

            }


            return [
                ...prev,
                product
            ];


        });


    }





    function increaseQty(id){


        setCart(prev=>

            prev.map(item=>

                item.id === id

                ?

                {
                    ...item,
                    qty:item.qty + 1
                }

                :

                item

            )

        );


    }





    function decreaseQty(id){


        setCart(prev=>

            prev.map(item=>

                item.id === id && item.qty > 1

                ?

                {
                    ...item,
                    qty:item.qty - 1
                }

                :

                item

            )

        );


    }





    function removeFromCart(id){


        setCart(prev=>

            prev.filter(
                item=>item.id !== id
            )

        );


    }





    return(

        <StoreContext.Provider

            value={{

                cart,

                wishlist,

                orders,

                checkoutItems,


                setOrders,

                setCheckoutItems,


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




export function useStore(){

    return useContext(StoreContext);

}