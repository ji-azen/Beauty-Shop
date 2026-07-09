import Navbar from "../../components/Navbar/Navbar";
import ProductGrid from "../../components/ProductGrid/ProductGrid";

function Home(){

    return(

        <>

            <Navbar/>

            <div
                style={{
                    maxWidth:"1300px",
                    margin:"40px auto",
                    padding:"20px"
                }}
            >

                <ProductGrid/>

            </div>

        </>

    )

}

export default Home;