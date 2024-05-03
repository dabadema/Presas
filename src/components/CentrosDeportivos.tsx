import React, { useEffect, useState } from 'react';
import './CentrosDeportivos.css';

type CentroDeportivo = {
    nombre: string;
    direccion: string;
    telefono: string;
    ciudad: string;
    email: string;
};

const CentrosDeportivos: React.FC = () => {
    const [centroData, setCentroData] = useState<CentroDeportivo>({
        nombre: '',
        direccion: '',
        telefono: '',
        ciudad: '',
        email: '',
    });
    const [centros, setCentros] = useState<CentroDeportivo[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchCentros = async () => {
            const response = await fetch('http://localhost:3000/centros-deportivos');
            const data = await response.json();
            if (response.ok) {
                setCentros(data);
            } else {
                console.error('Error fetching centros deportivos:', response);
            }
        };
        fetchCentros();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCentroData({ ...centroData, [name]: value });
    };

    const handleCreate = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/centros-deportivos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(centroData),
            });
            const newData = await response.json();
            if (response.ok) {
                setCentros([...centros, newData]);
                setIsModalOpen(true);
                setTimeout(() => setIsModalOpen(false), 3000);
                setCentroData({
                    nombre: '',
                    direccion: '',
                    ciudad: '',
                    telefono: '',
                    email: '',
                });
            } else {
                throw new Error('Error al crear el centro deportivo');
            }
        } catch (error) {
            console.error('Error creating centro deportivo:', error);
            alert(error.message);
        }
    };

    const handleDelete = async (centroId: string) => {
        if (!window.confirm('¿Estás seguro de que quieres eliminar este centro deportivo?')) return;
        try {
            const response = await fetch(`http://localhost:3000/centros-deportivos/${centroId}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete centro deportivo');
            setCentros(centros.filter((centro) => centro.centroId !== centroId));
            alert('Centro deportivo eliminado con éxito');
        } catch (error) {
            console.error('Error deleting centro deportivo:', error);
            alert('Error al eliminar el centro deportivo: ' + error.message);
        }
    };

    const handleCancel = () => {
        setCentroData({
            nombre: '',
            direccion: '',
            ciudad: '',
            telefono: '',
            email: '',
        });
    };

    return (
        <div className="centro-deportivo-container">
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={() => setIsModalOpen(false)}>
                            &times;
                        </span>
                        <p>Centro Deportivo creado con éxito.</p>
                    </div>
                </div>
            )}
            <div className="form-container-centro">
                <form className="new-centro-form" onSubmit={handleCreate}>
                    <h2>Crear Centro Deportivo</h2>
                    {/* Form fields here */}
                    <div className="form-frame">
                        <input
                            className="input-user"
                            type="text"
                            name="nombre"
                            value={centroData.nombre}
                            onChange={handleChange}
                            placeholder="Nombre"
                            required
                        />
                    </div>
                    <div className="form-frame">
                        <input
                            className="input-user"
                            type="text"
                            name="direccion"
                            value={centroData.direccion}
                            onChange={handleChange}
                            placeholder="Dirección"
                            required
                        />
                    </div>
                    <div className="form-frame">
                        <input
                            className="input-user"
                            type="text"
                            name="ciudad"
                            value={centroData.ciudad}
                            onChange={handleChange}
                            placeholder="Ciudad"
                            required
                        />
                    </div>
                    <div className="form-frame">
                        <input
                            className="input-user"
                            type="text"
                            name="telefono"
                            value={centroData.telefono}
                            onChange={handleChange}
                            placeholder="Teléfono"
                            required
                        />
                    </div>
                    <div className="form-frame">
                        <input
                            className="input-user"
                            type="text"
                            name="email"
                            value={centroData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit">Crear Centro</button>
                        <button className="danger-button" type="button" onClick={handleCancel}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
            <div className="centro-table-container">
                <h2>Centros Deportivos Existentes</h2>
                <table className="centros-table">
                    <thead className="centros-table-head">
                        <tr>
                            <th>Nombre</th>
                            <th>Dirección</th>
                            <th>Teléfono</th>
                            <th>Ciudad</th>
                            <th>Email</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {centros.map((centro) => (
                            <tr key={centro.centroId}>
                                <td>{centro.nombre}</td>
                                <td>{centro.direccion}</td>
                                <td>{centro.telefono}</td>
                                <td>{centro.ciudad}</td>
                                <td>{centro.email}</td>
                                <td>
                                    <button
                                        className="danger-button"
                                        onClick={() => handleDelete(centro.centroId)}
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

export default CentrosDeportivos;
