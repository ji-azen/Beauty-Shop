import {
    createContext,
    useContext,
    useState,
    useEffect
} from "react";

import api from "../api/axios";


const AuthContext = createContext();



export function AuthProvider({ children }) {


    const [user, setUser] = useState(
        JSON.parse(
            localStorage.getItem("user")
        ) || null
    );



    const [loading, setLoading] = useState(true);




    useEffect(()=>{


    const token =
    localStorage.getItem("token");


    const savedUser =
    localStorage.getItem("user");



    const loadUser = () => {

        if(token && savedUser){

            const userData =
            JSON.parse(savedUser);

            setUser(userData);

        }

        setLoading(false);

    };


    loadUser();


},[]);







    async function register(data){


        try{


            const response =
            await api.post(
                "/auth/register",
                data
            );



            return response.data;



        }catch(error){


            console.log(
                "Register error:",
                error
            );


            throw error;


        }


    }







    async function login(email,password){


        try{


            const response =
            await api.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );



            const {
                token,
                user
            } = response.data;



            // simpan token JWT

            localStorage.setItem(
                "token",
                token
            );



            // simpan user

            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );



            setUser(user);



            return true;



        }catch(error){


            console.log(
                "Login error:",
                error
            );


            return false;


        }


    }







    function logout(){


        localStorage.removeItem(
            "token"
        );


        localStorage.removeItem(
            "user"
        );



        setUser(null);


    }






    return (

        <AuthContext.Provider

            value={{
                user,
                loading,
                register,
                login,
                logout
            }}

        >

            {children}

        </AuthContext.Provider>

    );


}






export function useAuth(){

    return useContext(AuthContext);

}