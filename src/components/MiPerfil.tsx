import React, { useState } from 'react';
import './MiPerfil.css';

const MiPerfil = () => {
    // Estado para manejar los datos del formulario con valores iniciales #TODO pendiente de conectar con BBDD
    const [formData, setFormData] = useState({
        nombre: 'Juan',
        apellidos: 'Pérez',
        direccion: 'Calle Falsa 123',
        telefono: '655240850',
        email: 'juan.perez@example.com',
        // Agrega aquí más campos si es necesario
    });

    // Estado para manejar los datos originales del usuario
    const [originalData] = useState({
        ...formData,
    });

    // Función para actualizar el estado con los cambios del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((formData) => ({ ...formData, [name]: value }));
    };

    // Función para guardar los cambios
    const handleSave = () => {
        // Aquí implementarías la lógica para guardar los datos en la base de datos
        console.log('Datos guardados:', formData);
        // Por ejemplo: axios.post('/api/usuario/actualizar', formData)
    };

    // Función para cancelar los cambios y restablecer los datos originales
    const handleCancel = () => {
        setFormData(originalData);
    };

    return (
        <>
            <div className="mi-perfil-container">
                <form className="mi-perfil-form" onSubmit={(e) => e.preventDefault()}>
                    <h1 className="title">Edita tu perfil</h1>
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
                            placeholder="Introduce tu contraseña actual"
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
                            placeholder="Introduce tu nueva contraseña"
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="button" onClick={handleSave}>
                            Guardar Cambios
                        </button>
                        <button type="button" onClick={handleCancel}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default MiPerfil;
