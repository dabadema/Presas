import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

type LoginFormProps = {
    onLogin?: (email: string, password: string) => void;
};

const Login: React.FC<LoginFormProps> = ({}) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showModal, setShowModal] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/usuarios/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Login successful:', data);

                localStorage.setItem(
                    'userData',
                    JSON.stringify({
                        tipoUsuario: data.tipoUsuario,
                        userId: data.userId,
                        nombre: data.nombre,
                        email: data.email,
                        centroId: data.centroId,
                    })
                );
                navigate('/dashboard/home');
            } else {
                throw new Error(data.message || 'Usuario o contraseña incorrectos');
            }
        } catch (error: any) {
            window.alert(error.message);
        }
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
                <text className="title-login"> FITRONIC </text>

                <div className="form-frame">
                    <input
                        className="input-user"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                </div>
                <div className="form-frame">
                    <input
                        className="input-user"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Contraseña"
                        required
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
                </div>
            </form>
        </div>
    );
};

export default Login;
