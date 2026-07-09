import { Link } from "react-router-dom";

import "./ForgotPassword.css";

function ForgotPassword() {

    return (

        <div className="forgot-page">

            <div className="forgot-card">

                <h1>Lupa Password</h1>

                <p>

                    Masukkan email untuk reset password.

                </p>

                <input
                    type="email"
                    placeholder="Email"
                />

                <button>

                    Kirim Link Reset

                </button>

                <Link to="/login">

                    Kembali ke Login

                </Link>

            </div>

        </div>

    );

}

export default ForgotPassword;