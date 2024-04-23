import React, { useState } from 'react';
import './LoginForm.css';

type LoginFormProps = {
    onLogin: (email: string, password: string) => void;
};

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onLogin(email, password);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1 className="title"> G.I.D. </p>
                <div className="form-frame">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-frame">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
                <p>Olvidé mi contraseña</p>
                <button>Crear un nuevo usuario</button>{' '}
                {/* <button onClick={createNewUser}>Crear un nuevo usuario</button>  */}
            </form>
        </>
    );
};

export default LoginForm;
