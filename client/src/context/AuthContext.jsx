import {
    createContext,
    useContext,
    useState
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(
        JSON.parse(
            localStorage.getItem("user")
        ) || null
    );

    function register(data) {
        localStorage.setItem(
            "user",
            JSON.stringify(data)
        );
        setUser(data);
    }

    function login(email, password) {
        const savedUser = JSON.parse(
            localStorage.getItem("user")
        );
        if (
            savedUser &&
            savedUser.email === email &&
            savedUser.password === password
        ) {
            setUser(savedUser);
            return true;
        }
        return false;
    }

    function logout() {
        localStorage.removeItem("user");
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                register,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}