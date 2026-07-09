import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import "./Register.css";


function Register(){

    const { register } = useAuth();

    const navigate = useNavigate();


    const [form, setForm] = useState({

        name:"",
        email:"",
        password:""

    });



    const handleSubmit = (e)=>{

        e.preventDefault();


        register(form);


        alert("Registrasi berhasil");


        navigate("/login");

    };



    return(

        <div className="register-page">


            <div className="register-card">


                <h1>
                    🩵 Beauty Store
                </h1>


                <p>
                    Buat akun baru
                </p>



                <form onSubmit={handleSubmit}>


                    <input

                        type="text"

                        placeholder="Nama Lengkap"

                        value={form.name}

                        onChange={(e)=>

                            setForm({

                                ...form,

                                name:e.target.value

                            })

                        }

                    />



                    <input

                        type="email"

                        placeholder="Email"

                        value={form.email}

                        onChange={(e)=>

                            setForm({

                                ...form,

                                email:e.target.value

                            })

                        }

                    />



                    <input

                        type="password"

                        placeholder="Password"

                        value={form.password}

                        onChange={(e)=>

                            setForm({

                                ...form,

                                password:e.target.value

                            })

                        }

                    />



                    <button>

                        Daftar

                    </button>



                </form>



                <p>

                    Sudah punya akun?

                    <Link to="/login">

                        Login

                    </Link>

                </p>


            </div>


        </div>

    );

}


export default Register;