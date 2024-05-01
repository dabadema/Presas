import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MiPerfil from './MiPerfil';
import Reservas from './Reservas';
import Membresias from './Membresias';
import Consultas from './Consultas';
import NavBar from './NavBar';
import './Dashboard.css';
import AdminComp from './Administradores';
import CentrosDeportivos from './CentrosDeportivos';
import Instalaciones from './Instalaciones';

const Dashboard = () => {
    const tipo_usuario = 'superadministrador'; //#TODO Reemplazar con la lógica de obtención real de este dato

    return (
        <div className="dashboard-container">
            <NavBar tipo_usuario={tipo_usuario} />
            <div className="dashboard-content">
                <Routes>
                    <Route path="mi-perfil" element={<MiPerfil />} />
                    <Route path="administradores" element={<AdminComp />} />
                    <Route path="centros-deportivos" element={<CentrosDeportivos />} />
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
