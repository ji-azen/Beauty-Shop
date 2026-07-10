import {
    useState
} from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    useAuth
} from "../../context/AuthContext";

import "./Login.css";


function Login(){


    const {
        login
    } = useAuth();


    const navigate =
    useNavigate();



    const [email,setEmail] =
    useState("");


    const [password,setPassword] =
    useState("");


    const [loading,setLoading] =
    useState(false);




    async function handleSubmit(e){


        e.preventDefault();


        setLoading(true);



        try{


            const success =
            await login(
                email,
                password
            );



            if(success){


                alert(
                    "Login berhasil"
                );


                navigate("/");


            }else{


                alert(
                    "Email atau password salah"
                );


            }



        }catch(error){


            console.log(
                "Login error:",
                error
            );


            alert(
                "Terjadi kesalahan saat login"
            );


        }finally{


            setLoading(false);


        }


    }





    return(

        <div className="login-page">


            <div className="login-card">


                <h1>
                    🩵 Beauty Store
                </h1>



                <p>
                    Selamat datang kembali
                </p>





                <form
                    onSubmit={handleSubmit}
                >



                    <input

                        type="email"

                        placeholder="Email"

                        value={email}

                        onChange={(e)=>
                            setEmail(
                                e.target.value
                            )
                        }

                        required

                    />





                    <input

                        type="password"

                        placeholder="Password"

                        value={password}

                        onChange={(e)=>
                            setPassword(
                                e.target.value
                            )
                        }

                        required

                    />





                    <button
                        type="submit"
                        disabled={loading}
                    >


                        {
                            loading
                            ?
                            "Loading..."
                            :
                            "Login"
                        }


                    </button>



                </form>





                <Link to="/forgot-password">

                    Lupa Password?

                </Link>





                <p>


                    Belum punya akun?


                    {" "}


                    <Link to="/register">

                        Daftar

                    </Link>


                </p>



            </div>



        </div>


    );

}


export default Login;