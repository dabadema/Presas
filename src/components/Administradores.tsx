import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Administradores.css';

const Administradores: React.FC = () => {
    const [adminData, setAdminData] = useState({
        nombre: '',
        apellidos: '',
        direccion: '',
        centro_deportivo: '',
        telefono: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    // Estado para manejar los datos originales del usuario
    const [originalData] = useState({
        ...adminData,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setAdminData({ ...adminData, [name]: value });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (adminData.password !== adminData.confirmPassword) {
            alert('Las contraseñas no coinciden.');
            return;
        }
        // Aquí deberías enviar los datos a tu API o servidor para crear el usuario
        // Simulamos el éxito mostrando el modal
        setIsModalOpen(true);
        // Luego de un tiempo o al cerrar el modal, redirigimos al login
        setTimeout(() => {
            setIsModalOpen(false);
        }, 3000); // 3 segundos para mostrar el modal antes de redirigir
    };

    const handleCancel = () => {
        setAdminData(originalData);
    };

    return (
        <div className="new-user-container">
            {isModalOpen && <div className="modal">Usuario creado con éxito.</div>}
            <form className="new-user-form" onSubmit={handleSubmit}>
                <h1 className="title">Crear nuevo administrador</h1>
                <div className="form-frame">
                    <input
                        className="input-user"
                        type="text"
                        name="nombre"
                        value={adminData.nombre}
                        onChange={handleChange}
                        placeholder="Nombre"
                        required
                    />
                </div>
                <div className="form-frame">
                    <input
                        className="input-user"
                        type="text"
                        name="apellidos"
                        value={adminData.apellidos}
                        onChange={handleChange}
                        placeholder="Apellidos"
                        required
                    />
                </div>
                <div className="form-frame">
                    <input
                        className="input-user"
                        type="text"
                        name="centro_deportivo"
                        value={adminData.centro_deportivo}
                        onChange={handleChange}
                        placeholder="Centro Deportivo"
                        required
                    />
                </div>
                <div className="form-frame">
                    <input
                        className="input-user"
                        type="text"
                        name="direccion"
                        value={adminData.direccion}
                        onChange={handleChange}
                        placeholder="Dirección"
                        required
                    />
                </div>
                <div className="form-frame">
                    <input
                        className="input-user"
                        type="text"
                        name="telefono"
                        value={adminData.telefono}
                        onChange={handleChange}
                        placeholder="Teléfono"
                        required
                    />
                </div>
                <div className="form-frame">
                    <input
                        className="input-user"
                        type="email"
                        name="email"
                        value={adminData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                    />
                </div>
                <div className="form-frame">
                    <input
                        className="input-user"
                        type="password"
                        name="password"
                        value={adminData.password}
                        onChange={handleChange}
                        placeholder="Contraseña"
                        required
                    />
                </div>
                <div className="form-frame">
                    <input
                        className="input-user"
                        type="password"
                        name="confirmPassword"
                        value={adminData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Repite tu contraseña"
                        required
                    />
                </div>
                <div className="form-actions">
                    <button type="submit">Crear administrador</button>
                    <button type="button" onClick={handleCancel}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Administradores;
