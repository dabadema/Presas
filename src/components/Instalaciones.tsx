import React, { useEffect, useState } from 'react';
import './Instalaciones.css';

type Instalacion = {
    nombre: string;
    descripcion: string;
    centroId: string;
};

type CentroDeportivo = {
    centroId: string;
    nombre: string;
};

const Instalaciones: React.FC = () => {
    const [instalacionData, setInstalacionData] = useState<Instalacion>({
        nombre: '',
        descripcion: '',
        centroId: '',
    });
    const [instalaciones, setInstalaciones] = useState<Instalacion[]>([]);
    const [centroDeportivo, setCentroDeportivo] = useState<CentroDeportivo | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchCentroDeportivo = async () => {
            const userDataString = localStorage.getItem('userData');
            if (userDataString) {
                const userData = JSON.parse(userDataString);
                const response = await fetch(
                    `http://localhost:3000/centros-deportivos/${userData.centroId}`
                );
                const data = await response.json();
                console.log('respuesta desde el backend', data);
                if (response.ok) {
                    setCentroDeportivo(data[0]);
                    console.log('valores devueltos', centroDeportivo);
                } else {
                    console.error('Error fetching centro deportivo:', response);
                }
            }
        };

        fetchCentroDeportivo();

        const fetchInstalaciones = async () => {
            const response = await fetch('http://localhost:3000/instalaciones');
            const data = await response.json();
            if (response.ok) {
                setInstalaciones(data);
                console.log('tras fecth instalaciones', data);
            } else {
                console.error('Error fetching instalaciones:', response);
            }
        };
        fetchInstalaciones();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setInstalacionData({ ...instalacionData, [name]: value });
    };

    const handleCreate = async (event: React.FormEvent) => {
        event.preventDefault();

        // Parsear el objeto JSON del localStorage para obtener userData
        const userDataString = localStorage.getItem('userData');
        if (!userDataString) {
            alert('No se encontró la información del usuario en el almacenamiento local.');
            return;
        }

        const userData = JSON.parse(userDataString);
        const centroId = userData.centroId;

        if (!centroId) {
            alert('No se encontró el ID del centro.');
            return;
        }

        const instalacionCompleta = {
            ...instalacionData,
            centroId,
        };

        try {
            const response = await fetch('http://localhost:3000/instalaciones', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(instalacionCompleta),
            });
            const newData = await response.json();
            if (response.ok) {
                setInstalaciones([...instalaciones, newData]);
                setIsModalOpen(true);
                setTimeout(() => setIsModalOpen(false), 3000);
                setInstalacionData({
                    nombre: '',
                    descripcion: '', // Asegúrate de resetear todos los campos relevantes
                    centroId: '',
                });
            } else {
                throw new Error('Error al crear la instalación');
            }
        } catch (error) {
            console.error('Error creating instalación:', error);
            alert(error.message);
        }
    };

    const handleDelete = async (instalacionId: string) => {
        if (!window.confirm('¿Estás seguro de que quieres eliminar esta instalación?')) return;
        try {
            const response = await fetch(`http://localhost:3000/instalaciones/${instalacionId}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete instalación');
            setInstalaciones(
                instalaciones.filter((instalacion) => instalacion.instalacionId !== instalacionId)
            );
            alert('Instalación eliminada con éxito');
        } catch (error) {
            console.error('Error deleting instalación:', error);
            alert('Error al eliminar la instalación: ' + error.message);
        }
    };

    const handleCancel = () => {
        setInstalacionData({
            nombre: '',
            descripcion: '',
        });
    };

    return (
        <div className="instalacion-container">
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={() => setIsModalOpen(false)}>
                            &times;
                        </span>
                        <p>Instalación creada con éxito.</p>
                    </div>
                </div>
            )}
            <div className="form-container-instalacion">
                <form className="new-instalacion-form" onSubmit={handleCreate}>
                    <h2>Crear Instalación</h2>
                    {/* Form fields here */}
                    <div className="form-frame">
                        <input
                            className="input-user"
                            type="text"
                            name="nombre"
                            value={instalacionData.nombre}
                            onChange={handleChange}
                            placeholder="Nombre"
                            required
                        />
                    </div>
                    <div className="form-frame">
                        <input
                            className="input-user"
                            type="text"
                            name="descripcion"
                            value={instalacionData.descripcion}
                            onChange={handleChange}
                            placeholder="Dirección"
                            required
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit">Crear Instalación</button>
                        <button className="danger-button" type="button" onClick={handleCancel}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
            <div className="instalacion-table-container">
                <h2>
                    Instalaciones Existentes{centroDeportivo ? ` en ${centroDeportivo.nombre}` : ''}
                </h2>
                <table className="instalaciones-table">
                    <thead className="instalaciones-table-head">
                        <tr>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {instalaciones.map((instalacion) => (
                            <tr key={instalacion.instalacionId}>
                                <td>{instalacion.nombre}</td>
                                <td>{instalacion.descripcion}</td>
                                <td>
                                    <button
                                        className="danger-button"
                                        onClick={() => handleDelete(instalacion.instalacionId)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Instalaciones;
