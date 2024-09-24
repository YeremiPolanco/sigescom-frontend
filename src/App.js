import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Error from './component/Adicionales/Error';
import Login from './component/security/Login';
import Inventory from './component/inventory/Inventory';
import Sidebar from "./component/Adicionales/Sidebar";
import './App.css';

const App = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const isAuthenticated = () => {
        const token = localStorage.getItem('authToken');
        return token !== null;
    };

    // Obtener el usuario de localStorage (o de un contexto)
    const user = {
        name: localStorage.getItem('userName') || 'Usuario',
        role: localStorage.getItem('userRole') || 'Invitado',
    };

    const location = useLocation(); // Obtén la ubicación actual para condicionar el sidebar

    return (
        <div>
            {/* Mostrar el Sidebar solo cuando no esté en las rutas de Login o Error */}
            {location.pathname !== '/' && location.pathname !== '/error' && (
                <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} user={user} />
            )}

            <div className={isSidebarOpen ? "main-content" : "main-content sidebar-closed"}>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route
                        path="/inventory"
                        element={isAuthenticated() ? <Inventory /> : <Navigate to="/error" />}
                    />
                    <Route path="/error" element={<Error />} />
                    <Route path="*" element={<Navigate to="/error" />} />
                </Routes>
            </div>
        </div>
    );
};

const AppWrapper = () => (
    <Router>
        <App />
    </Router>
);

export default AppWrapper;
