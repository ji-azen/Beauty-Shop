import AppRouter from "./routes/AppRouter";

import { useStore } from "./context/StoreContext";


function App(){


    const { message = "" } = useStore();



    return(

        <>

            {
                message && (

                    <div className="toast">

                        {message}

                    </div>

                )
            }


            <AppRouter />


        </>

    );

}


export default App;