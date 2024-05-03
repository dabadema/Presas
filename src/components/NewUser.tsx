import React, { useEffect, useState } from 'react';
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
        tipoUsuario: 'usuario', // En este caso siempre va a ser del tipo "usuario"
        centroId: '',
    });

    const [centrosDeportivos, setCentrosDeportivos] = useState([]);
    // const [isModalOpen, setIsModalOpen] = useState(false);  Modales pendientes de implementar
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3000/centros-deportivos')
            .then((response) => response.json())
            .then((data) => setCentrosDeportivos(data))
            .catch((error) => console.error('Error fetching centros deportivos:', error));
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        event.preventDefault();
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        console.log('formulario', JSON.stringify(formData));
        event.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: formData.nombre,
                    apellidos: formData.apellidos,
                    direccion: formData.direccion,
                    telefono: formData.telefono,
                    email: formData.email,
                    password: formData.password,
                    tipoUsuario: formData.tipoUsuario,
                    centroId: formData.centroId,
                }),
            });

            if (!response.ok) throw new Error('Error en la creación del usuario');

            console.log('respuesta', response);
            const data = await response.json();
            alert('Usuario creado con éxito: ' + data.nombre);
            navigate('/login');
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            alert('Error al crear el usuario');
        }
    };

    const handleCancel = () => {
        navigate('/login');
    };

    return (
        <div className="new-user-container">
            {/* {isModalOpen && <div className="modal">Usuario creado con éxito.</div>} */}
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
                    <div className="form-frame">
                        <select
                            className="input-user"
                            name="centroId"
                            value={formData.centroId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecciona un centro deportivo</option>
                            {centrosDeportivos.map((centro) => (
                                <option key={centro.centroId} value={centro.centroId}>
                                    {centro.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
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
                    <button className="danger-button" type="button" onClick={handleCancel}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewUser;
