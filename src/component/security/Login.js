import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginService from "../../service/LoginService";
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de tener Bootstrap

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await LoginService.login(username, password);
            localStorage.setItem('authToken', response.token);
            localStorage.setItem('fullName', response.fullName);
            localStorage.setItem('role', response.role);
            setTimeout(() => {
                navigate("/inventory"); // Redirige después de un breve retraso
            }, 100);
        } catch (err) {
            setError("Login failed. Please check your credentials.");
            console.error(err);
        }
    };

    return (
        <div className="container d-flex align-items-center justify-content-center vh-100">
            <div className="card p-4 shadow" style={{ width: '400px' }}>
                <h2 className="text-center mb-4">Login</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
