import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MiPerfil from './MiPerfil';
import Reservas from './Reservas';
import Membresias from './Membresias';
import Consultas from './Consultas';
import NavBar from './NavBar';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <NavBar />
            <div className="dashboard-content">
                <Routes>
                    <Route path="mi-perfil" element={<MiPerfil />} />
                    <Route path="reservas" element={<Reservas />} />
                    <Route path="membresias" element={<Membresias />} />
                    <Route path="consultas" element={<Consultas />} />
                </Routes>
            </div>
        </div>
    );
};

export default Dashboard;
