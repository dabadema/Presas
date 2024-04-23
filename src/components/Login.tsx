import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Asumiendo que tienes un archivo CSS para estilos

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        // Aquí puedes eventualmente añadir la lógica para validar las credenciales de usuario
        // Por ahora, simplemente navegaremos al dashboard como si la autenticación fuera exitosa
        navigate('/dashboard/mi-perfil'); // Navega a la página de perfil del usuario en el dashboard
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault(); // Previene el comportamiento por defecto del formulario
                    handleLogin(); // Llama a la función de manejo de login
                }}
            >
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" />

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
