import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
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
        </nav>
    );
};

export default NavBar;
