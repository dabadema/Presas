import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewUser.css';

const NewUser: React.FC = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellidos: '',
        direccion: '',
        telefono: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('Hola que pasas aqui');
        // const { name, value } = event.target;
        // setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Las contraseñas no coinciden.');
            return;
        }
        // Aquí deberías enviar los datos a tu API o servidor para crear el usuario
        // Simulamos el éxito mostrando el modal
        setIsModalOpen(true);
        // Luego de un tiempo o al cerrar el modal, redirigimos al login
        setTimeout(() => {
            setIsModalOpen(false);
            navigate('/login');
        }, 3000); // 3 segundos para mostrar el modal antes de redirigir
    };

    const handleCancel = () => {
        navigate('/login');
    };
    navigate('/login');

    return (
        <div className="new-user-container">
            {isModalOpen && <div className="modal">Usuario creado con éxito.</div>}
            <form className="new-user-form" onSubmit={handleSubmit}>
                <h1 className="title">Crear nuevo usuario</h1>
                <div className="form-frame">
                    <input
                        className="input-user"
                        type="text"
                        name="nombre"
                        value={formData.nombre}
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
                        value={formData.apellidos}
                        onChange={handleChange}
                        placeholder="Apellidos"
                        required
                    />
                </div>
                <div className="form-frame">
                    <input
                        className="input-user"
                        type="text"
                        name="direccion"
                        value={formData.direccion}
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
                        value={formData.telefono}
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
                        value={formData.email}
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
                        value={formData.password}
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
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Repite tu contraseña"
                        required
                    />
                </div>
                <div className="form-actions">
                    <button type="submit">Crear usuario</button>
                    <button type="button" onClick={handleCancel}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewUser;
