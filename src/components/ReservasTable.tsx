import React from 'react';
import './ReservasTable.css';

type Reserva = {
    usuario: string;
    centroDeportivo: string;
    instalacion: string;
    horaInicio: string;
    horaFin: string;
};

type ReservasTableProps = {
    reservas: Reserva[];
};

const ReservasTable: React.FC<ReservasTableProps> = ({ reservas }) => {
    const handleCancel = (index: number) => {
        // Función para manejar la cancelación de reservas
        console.log('Cancelar reserva', reservas[index]);
        // Aquí iría la lógica para cancelar la reserva, como una solicitud a la API
    };

    return (
        <table className="reservas-table">
            <thead>
                <tr>
                    <th>Usuario</th>
                    <th>Centro Deportivo</th>
                    <th>Instalación</th>
                    <th>Hora de Inicio</th>
                    <th>Hora de Fin</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                {reservas.map((reserva, index) => (
                    <tr key={index}>
                        <td>{reserva.usuario}</td>
                        <td>{reserva.centroDeportivo}</td>
                        <td>{reserva.instalacion}</td>
                        <td>{reserva.horaInicio}</td>
                        <td>{reserva.horaFin}</td>
                        <td>
                            <button onClick={() => handleCancel(index)}>Cancelar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ReservasTable;
