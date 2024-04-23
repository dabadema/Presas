// En tu archivo NavBar.tsx
import React from 'react';
import './NavBar.css';

type UserInfo = {
    nombre: string;
    tipo: string;
};

const NavBar: React.FC<{ userInfo: UserInfo }> = ({ userInfo }) => {
    return (
        <nav className="navbar">
            <span className="navbar-user-info">{userInfo.nombre}</span>
            <ul className="navbar-nav">
                <li className="nav-item">Mi perfil</li>
                <li className="nav-item">Administradores</li>
                <li className="nav-item">Centros deportivos</li>
                <li className="nav-item">Instalaciones</li>
                <li className="nav-item">Membresías</li>
                <li className="nav-item">Reservas</li>
                <li className="nav-item">Consultas</li>
                <li className="nav-item">Logout</li>
            </ul>
        </nav>
    );
};

export default NavBar;
