import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({ tipo_usuario }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // #TODO Aquí puedes agregar la lógica para manejar el proceso de logout
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
                {/* Enlaces exclusivos para Superadministradores */}
                {tipo_usuario === 'superadministrador' && (
                    <>
                        <li>
                            <NavLink
                                to="/dashboard/administradores"
                                className={({ isActive }) => (isActive ? 'active' : '')}
                            >
                                Administradores
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard/centros-deportivos"
                                className={({ isActive }) => (isActive ? 'active' : '')}
                            >
                                Centros Deportivos
                            </NavLink>
                        </li>
                    </>
                )}
                {/* Enlaces para Administradores y Superadministradores */}
                {(tipo_usuario === 'administrador' || tipo_usuario === 'superadministrador') && (
                    <li>
                        <NavLink
                            to="/dashboard/instalaciones"
                            className={({ isActive }) => (isActive ? 'active' : '')}
                        >
                            Instalaciones
                        </NavLink>
                    </li>
                )}
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
