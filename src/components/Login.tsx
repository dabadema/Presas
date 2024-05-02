import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

type LoginFormProps = {
    onLogin: (email: string, password: string) => void;
};

const Login: React.FC<LoginFormProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault(); // Esto evita que el formulario se envíe tradicionalmente.
        // Aquí puedes eventualmente añadir la lógica para validar las credenciales de usuario
        // Por ahora, simplemente navegaremos al dashboard como si la autenticación fuera exitosa
        navigate('/dashboard/mi-perfil'); // Navega a la página de perfil del usuario en el dashboard
    };

    const handleForgotPassword = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="login-container">
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={closeModal}>
                            &times;
                        </span>
                        <p>
                            Funcionalidad pendiente de implementar, por favor, consulte al
                            administrador de su centro deportivo.
                        </p>
                    </div>
                </div>
            )}
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
                    <button type="button" onClick={() => navigate('/new-user')}>
                        Crear un nuevo usuario
                    </button>
                    <button className="alert-button" type="button" onClick={handleForgotPassword}>
                        Olvidé mi contraseña
                    </button>
                    {/* Asegúrate de que este botón no envíe el formulario */}
                </div>
            </form>
        </div>
    );
};

export default Login;
