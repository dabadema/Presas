import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav>
            {/* Enlaces o botones que llevan a las diferentes partes del dashboard */}
            <Link to="/dashboard/mi-perfil">Mi Perfil</Link>
            <Link to="/dashboard/reservas">Reservas</Link>
            <Link to="/dashboard/membresias">Membresias</Link>
            <Link to="/dashboard/consultas">Consultas</Link>
        </nav>
    );
};

export default NavBar;
