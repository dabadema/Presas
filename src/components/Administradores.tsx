import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Administradores.css';

const AdminComp: React.FC = () => {
    const [adminData, setAdminData] = useState<AdminFormData>({
        nombre: '',
        apellidos: '',
        direccion: '',
        centro_deportivo: '',
        telefono: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [administradores, setAdministradores] = useState<Admin[]>(
        [
            {
                nombre: 'Laura',
                apellidos: 'Martínez',
                direccion: 'Calle Falsa 123',
                email: 'laura@example.com',
                centroDeportivo: 'Centro Deportivo Norte',
                telefono: '655640850',
            },
            {
                nombre: 'Carlos',
                apellidos: 'González',
                direccion: 'Avenida Principal 456',
                email: 'carlos@example.com',
                centroDeportivo: 'Centro Deportivo Sur',
                telefono: '655640850',
            },
            {
                nombre: 'Ana',
                apellidos: 'López',
                direccion: 'Calle Secundaria 789',
                email: 'ana@example.com',
                centroDeportivo: 'Centro Deportivo Este',
                telefono: '655640850',
            },
        ]
        // Datos iniciales, que eventualmente vendrán de la base de datos
    );

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [originalData] = useState({
        ...adminData,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setAdminData({ ...adminData, [name]: value });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (adminData.password !== adminData.confirmPassword) {
            alert('Las contraseñas no coinciden.');
            return;
        }
        // Aquí deberías enviar los datos a tu API o servidor para crear el usuario
        // Simulamos el éxito mostrando el modal
        setIsModalOpen(true);
        // Luego de un tiempo o al cerrar el modal, redirigimos al login
        setTimeout(() => {
            setIsModalOpen(false);
        }, 3000); // 3 segundos para mostrar el modal antes de redirigir
    };

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        if (adminData.password !== adminData.confirmPassword) {
            alert('Las contraseñas no coinciden.');
            return;
        }
        // Aquí iría la lógica para enviar los datos a la API y actualizar el estado
        console.log('Crear administrador:', adminData);
        // Simulamos el éxito mostrando el modal
        setIsModalOpen(true);
        // Luego de un tiempo o al cerrar el modal, redirigimos al login
        setTimeout(() => {
            setIsModalOpen(false);
        }, 3000); // 3 segundos para mostrar el modal antes de redirigir
        // Suponiendo que la API devuelve el nuevo administrador con los datos correctos:
        // setAdministradores([...administradores, { ...respuestaAPI }]);
    };

    const handleDelete = (index: number) => {
        // Lógica para eliminar el administrador usando el índice
        console.log('Eliminar administrador:', administradores[index]);
        // Eliminar de la lista después de una confirmación exitosa de la API
        // setAdministradores(administradores.filter((_, i) => i !== index));
    };

    const handleCancel = () => {
        setAdminData(originalData);
    };

    return (
        <div className="admin-management-container">
            <div className="admin-form-container">
                {isModalOpen && <div className="modal">Usuario creado con éxito.</div>}
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
                            name="centro_deportivo"
                            value={adminData.centro_deportivo}
                            onChange={handleChange}
                            placeholder="Centro Deportivo"
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
                            <th>Centro Deportivo</th>
                            <th>Teléfono</th>
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
                                <td>{admin.centroDeportivo}</td>
                                <td>{admin.telefono}</td>
                                <td>{admin.email}</td>
                                <td>
                                    <button onClick={() => handleDelete(index)}>Eliminar</button>
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
