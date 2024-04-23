import React from 'react';
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard/*" element={<Dashboard />} />
                <Route path="*" element={<Navigate replace to="/login" />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
