import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Aquí puedes agregar la lógica para manejar el proceso de logout
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <ul>
                <li>
                    <NavLink
                        to="/dashboard/mi-perfil"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Mi Perfil
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/dashboard/reservas"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Reservas
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/dashboard/membresias"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Membresias
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/dashboard/consultas"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Consultas
                    </NavLink>
                </li>
            </ul>
            <div className="logout-container">
                <button onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
};

export default NavBar;
