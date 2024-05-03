import React, { useEffect, useState } from 'react';
import './AdminComp.css';

type AdminFormData = {
    nombre: string;
    apellidos: string;
    direccion: string;
    centroId: string;
    telefono: string;
    email: string;
    password: string;
    confirmPassword: string;
};

type Admin = {
    nombre: string;
    apellidos: string;
    direccion: string;
    centroId: string;
    telefono: string;
    email: string;
    userId: string;
};

const AdminComp: React.FC = () => {
    const [adminData, setAdminData] = useState<AdminFormData>({
        nombre: '',
        apellidos: '',
        direccion: '',
        centroId: '',
        telefono: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [administradores, setAdministradores] = useState<Admin[]>([]);
    const [centrosDeportivos, setCentrosDeportivos] = useState([]);
    const [centrosMap, setCentrosMap] = useState<Map<string, string>>(new Map());
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchAdministradores = async () => {
            try {
                const response = await fetch('http://localhost:3000/usuarios/administradores');
                const data = await response.json();
                if (response.ok) {
                    setAdministradores(data);
                } else {
                    throw new Error(data.message || 'Error al cargar los administradores');
                }
            } catch (error) {
                alert('Error al cargar los administradores: ' + error.message);
            }
        };

        fetchAdministradores();

        const fetchCentrosDeportivos = async () => {
            try {
                const response = await fetch('http://localhost:3000/centros-deportivos');
                const data = await response.json();
                if (response.ok) {
                    setCentrosDeportivos(data);
                    const map = new Map();
                    data.forEach((centro: any) => map.set(centro.centroId, centro.nombre));
                    setCentrosMap(map);
                } else {
                    throw new Error(data.message || 'Error al cargar los centros deportivos');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchCentrosDeportivos();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setAdminData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (adminData.password !== adminData.confirmPassword) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...adminData, tipoUsuario: 'administrador' }),
            });
            const data = await response.json();
            if (response.ok) {
                setAdministradores([...administradores, data]);
                setIsModalOpen(true);
                setTimeout(() => setIsModalOpen(false), 3000);
                setAdminData({
                    nombre: '',
                    apellidos: '',
                    direccion: '',
                    centroId: '',
                    telefono: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                });
            } else {
                throw new Error(data.message || 'Error al crear el administrador');
            }
        } catch (error) {
            alert('Error al crear el administrador: ' + error.message);
        }
    };

    const handleDelete = async (admin: any) => {
        const confirmDelete = window.confirm(
            `¿Estás seguro de que deseas eliminar al administrador "${admin.nombre}"?`
        );
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:3000/usuarios/${admin.userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Error al eliminar el administrador');
            }

            setAdministradores((prevAdministradores) =>
                prevAdministradores.filter((a) => a.userId !== admin.userId)
            );
            alert(`Administrador ${admin.nombre} eliminado con éxito.`);
        } catch (error) {
            console.log('Error al eliminar el administrador:', error);
            alert('Error al eliminar el administrador: ' + error.message);
        }
    };

    const handleCancel = () => {
        setAdminData({
            nombre: '',
            apellidos: '',
            direccion: '',
            centroId: '',
            telefono: '',
            email: '',
            password: '',
            confirmPassword: '',
        });
    };

    return (
        <div className="admin-management-container">
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={() => setIsModalOpen(false)}>
                            &times;
                        </span>
                        <p>Administrador creado con éxito.</p>
                    </div>
                </div>
            )}
            <div className="admin-form-container">
                <form className="new-admin-form" onSubmit={handleCreate}>
                    <h2>Crear nuevo administrador</h2>
                    <div className="form-frame">
                        <input
                            className="input-user"
                            type="text"
                            name="nombre"
                            value={adminData.nombre}
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
                            value={adminData.apellidos}
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
                            value={adminData.direccion}
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
                            value={adminData.telefono}
                            onChange={handleChange}
                            placeholder="Teléfono"
                            required
                        />
                    </div>

                    <div className="form-frame">
                        <select
                            className="input-user"
                            name="centroId"
                            value={adminData.centroId}
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

                    <div className="form-frame">
                        <input
                            className="input-user"
                            type="email"
                            name="email"
                            value={adminData.email}
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
                            value={adminData.password}
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
                            value={adminData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Repite tu contraseña"
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit">Crear administrador</button>
                        <button className="danger-button" type="button" onClick={handleCancel}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
            <div className="admin-table-container">
                <h2>Administradores Existentes</h2>
                <table className="admins-table">
                    <thead className="admins-table-head">
                        <tr>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>Dirección</th>
                            <th>Teléfono</th>
                            <th>Centro Deportivo</th>
                            <th>Email</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {administradores.map((admin, index) => (
                            <tr key={index}>
                                <td>{admin.nombre}</td>
                                <td>{admin.apellidos}</td>
                                <td>{admin.direccion}</td>
                                <td>{admin.telefono}</td>
                                <td>{centrosMap.get(admin.centroId) || 'Centro no encontrado'}</td>
                                <td>{admin.email}</td>
                                <td>
                                    <button onClick={() => handleDelete(admin)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminComp;
