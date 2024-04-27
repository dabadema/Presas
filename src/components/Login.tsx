import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

type LoginFormProps = {
    onLogin: (email: string, password: string) => void;
};

const Login: React.FC<LoginFormProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault(); // Esto evita que el formulario se envíe tradicionalmente.
        // Aquí puedes eventualmente añadir la lógica para validar las credenciales de usuario
        // Por ahora, simplemente navegaremos al dashboard como si la autenticación fuera exitosa
        navigate('/dashboard/mi-perfil'); // Navega a la página de perfil del usuario en el dashboard
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h1 className="title"> G.I.D. </h1>
                <div className="form-frame">
                    {/* <label htmlFor="email"></label> */}
                    <input
                        className="input-user"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        // required
                    />
                </div>
                <div className="form-frame">
                    {/* <label htmlFor="password"></label> */}
                    <input
                        className="input-user"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Contraseña"
                        // required
                    />
                </div>
                <button type="submit">Login</button>
                <div className="alternatives">
                    <p>Olvidé mi contraseña</p>
                    <button type="button" onClick={() => navigate('/new-user')}>
                        Crear un nuevo usuario
                    </button>
                    {/* Asegúrate de que este botón no envíe el formulario */}
                </div>
            </form>
        </div>
    );
};

export default Login;
