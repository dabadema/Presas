import React, { useEffect, useState } from 'react';
import './MiPerfil.css';

type CentroDeportivo = {
    centroId: string;
    nombre: string;
};

type FormData = {
    nombre: string;
    apellidos: string;
    direccion: string;
    telefono: string;
    email: string;
    centroId: string;
};

const MiPerfil = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellidos: '',
        direccion: '',
        telefono: '',
        email: '',
        centroId: '',
    });

    const [centrosDeportivos, setCentrosDeportivos] = useState<FormData>([]);

    const loadCentrosDeportivos = async () => {
        try {
            const response = await fetch('http://localhost:3000/centros-deportivos');
            const data: CentroDeportivo[] = await response.json();
            if (response.ok) {
                setCentrosDeportivos(data);
            } else {
                throw new Error(data[0]?.nombre || 'Error al cargar los centros deportivos');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const loadUserData = async () => {
        const userId = JSON.parse(localStorage.getItem('userData') || '{}').userId;
        if (!userId) return;

        try {
            const response = await fetch(`http://localhost:3000/usuarios/${userId}`);
            const userData: FormData = await response.json();
            if (response.ok) {
                const centroDeportivoFound =
                    centrosDeportivos.find((cd) => cd.centroId === userData.centroId)?.nombre || '';
                setFormData({
                    nombre: userData.nombre,
                    apellidos: userData.apellidos,
                    direccion: userData.direccion,
                    telefono: userData.telefono,
                    email: userData.email,
                    centroDeportivoFound,
                });
            } else {
                throw new Error(userData.email || 'Error al cargar los datos del usuario');
            }
        } catch (error) {
            console.error('Error al cargar los datos del usuario:', error);
        }
    };

    useEffect(() => {
        loadCentrosDeportivos();
    }, []);

    useEffect(() => {
        if (centrosDeportivos.length > 0) {
            loadUserData();
        }
    }, [centrosDeportivos]);

    // Función para actualizar el estado con los cambios del formulario a la vez que lo estamos modificando
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Función para guardar los cambios
    const handleSave = async () => {
        const userId = JSON.parse(localStorage.getItem('userData') || '{}').userId;
        if (!userId) {
            console.error('No user ID found, unable to save.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/usuarios/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: formData.nombre,
                    apellidos: formData.apellidos,
                    direccion: formData.direccion,
                    telefono: formData.telefono,
                    email: formData.email,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Actualización exitosa:', data);
                alert('Perfil actualizado correctamente!');
            } else {
                throw new Error(data.message || 'Error al actualizar el perfil');
            }
        } catch (error: any) {
            console.error('Error al actualizar los datos del usuario:', error);
            alert('Error al actualizar el perfil: ' + error.message);
        }
    };

    // Función para cancelar los cambios y restablecer los datos originales
    const handleCancel = () => {
        loadUserData();
    };

    return (
        <>
            <div className="mi-perfil-container">
                <form className="mi-perfil-form" onSubmit={(e) => e.preventDefault()}>
                    <h1 className="title">Edita tu perfil</h1>
                    <div className="form-frame-centro">
                        <label>Centro Deportivo: {formData.centroDeportivoFound}</label>
                    </div>
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
                    {/* TODO Hacer que compruebe por que la contraseña que introduce realmente es la
                    actual */}
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
                        <button className="danger-button" type="button" onClick={handleCancel}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default MiPerfil;
