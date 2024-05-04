import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MiPerfil from './MiPerfil';
import Reservas from './Reservas';
import Membresias from './Membresias';
import Consultas from './Consultas';
import NavBar from './NavBar';
import './Dashboard.css';
import AdminComp from './AdminComp';
import CentrosDeportivos from './CentrosDeportivos';
import Instalaciones from './Instalaciones';
import Home from './Home';

const Dashboard = () => {
    const userInfo = JSON.parse(localStorage.getItem('userData') || '{}');
    const tipo_usuario = userInfo.tipoUsuario;

    return (
        <div className="dashboard-container">
            <NavBar tipo_usuario={tipo_usuario} />
            <div className="dashboard-content">
                <Routes>
                    <Route path="home" element={<Home />} />
                    <Route path="mi-perfil" element={<MiPerfil />} />
                    {tipo_usuario === 'superadministrador' && (
                        <Route path="administradores" element={<AdminComp />} />
                    )}
                    {tipo_usuario === 'superadministrador' && (
                        <Route path="centros-deportivos" element={<CentrosDeportivos />} />
                    )}

                    <Route path="instalaciones" element={<Instalaciones />} />

                    <Route path="reservas" element={<Reservas />} />
                    <Route path="membresias" element={<Membresias />} />
                    <Route path="consultas" element={<Consultas />} />
                </Routes>
            </div>
        </div>
    );
};

export default Dashboard;
