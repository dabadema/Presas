import React, { useState } from 'react';
import './RegisterForm.css'; // Asegúrate de tener este archivo con tus estilos

// Definimos el tipo para nuestro estado del formulario
type FormData = {
    nombre: string;
    apellidos: string;
    direccion: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const RegisterForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        nombre: '',
        apellidos: '',
        direccion: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Verificamos si las contraseñas coinciden
        if (formData.password !== formData.confirmPassword) {
            alert('Las contraseñas no coinciden.');
            return;
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit}>
                <h1>G.I.D.</h1>
                <p>Formulario nuevo usuario:</p>
                <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Nombre"
                    required
                />
                <input
                    type="text"
                    name="apellidos"
                    value={formData.apellidos}
                    onChange={handleChange}
                    placeholder="Apellidos"
                    required
                />
                <input
                    type="text"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                    placeholder="Dirección"
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repite tu password"
                    required
                />
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
};

export default RegisterForm;
