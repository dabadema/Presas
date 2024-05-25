import React, { useEffect, useState } from 'react';
import './ReservasTable.css';

interface Reserva {
    fechaHoraInicio: string;
    fechaHoraFin: string;
    instalacionId: string;
    userId: string;
    reservaId: string;
}

interface Instalacion {
    instalacionId: string;
    nombre: string;
}

interface CentroDeportivo {
    centroId: string;
    nombre: string;
}

const ReservasTable: React.FC<> = ({}) => {
    const [reservas, setReservas] = useState<Reserva[]>([]);
    const [instalaciones, setInstalaciones] = useState<Instalacion>([]);
    const [centroDeportivo, setCentroDeportivo] = useState<CentroDeportivo>([]);
    const [centroDeportivoId, setCentroDeportivoId] = useState<string>('');
    const [instalacionSeleccionada, setInstalacionSeleccionada] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [fechasSemana, setFechasSemana] = useState<Date[]>([]);
    const [semanaOffset, setSemanaOffset] = useState<number>(0);

    useEffect(() => {
        const userDataString = localStorage.getItem('userData');
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            setUserId(userData.userId);
            setCentroDeportivoId(userData.centroId);
            console.log('user ID logueado', userData.userId);
            console.log('centro ID logueado', centroDeportivoId);
        }

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
                    setCentroDeportivo(data);
                    console.log('fecth centro deportivo', data);
                } else {
                    console.error('Error fetching centro deportivo:', response);
                }
            }
        };

        fetchCentroDeportivo();

        const fetchInstalaciones = async () => {
            const userDataString = localStorage.getItem('userData');
            if (userDataString) {
                const userData = JSON.parse(userDataString);
                const response = await fetch(
                    `http://localhost:3000/instalaciones/centro/${userData.centroId}`
                );
                const data = await response.json();
                console.log('tras fecth instalaciones', data);
                if (response.ok) {
                    setInstalaciones(data);
                    console.log('tras fecth instalaciones', data);
                } else {
                    console.error('Error fetching instalaciones:', response);
                }
            }
        };

        fetchInstalaciones();
        calcularFechasSemana(semanaOffset);
    }, [semanaOffset]);

    useEffect(() => {
        if (instalacionSeleccionada) {
            fetchReservas(instalacionSeleccionada);
        }
    }, [instalacionSeleccionada, fechasSemana]);

    const calcularFechasSemana = (offset: number) => {
        const hoy = new Date();
        hoy.setDate(hoy.getDate() + offset * 7); // Ajusta la fecha según el offset de semanas
        const primerDiaSemana = hoy.getDate() - hoy.getDay() + 1;
        const semana = [];
        for (let i = 0; i < 7; i++) {
            const fecha = new Date(hoy.setDate(primerDiaSemana + i));
            semana.push(new Date(fecha)); // Clonar la fecha
        }
        setFechasSemana(semana);
    };

    const fetchReservas = async (instalacionId: string) => {
        // const startISO = start.toISOString();
        // const endISO = end.toISOString();
        const response = await fetch(`http://localhost:3000/reservas/${instalacionId}`);
        const data = await response.json();
        if (response.ok) {
            setReservas(data);
        } else {
            console.error('Error fetching reservas:', response);
        }
    };

    const handleInstalacionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const instalacionId = event.target.value;
        setInstalacionSeleccionada(instalacionId);
    };

    const handleReservaClick = async (hora: string, dia: string) => {
        if (instalacionSeleccionada && userId) {
            const fechaHoraInicio = new Date(`${dia} ${hora}:00:00.000+0200`);

            const fechaHoraFin = new Date(fechaHoraInicio);
            fechaHoraFin.setHours(fechaHoraInicio.getHours() + 1);

            if (fechaHoraFin <= fechaHoraInicio) {
                fechaHoraFin.setHours(fechaHoraInicio.getHours() + 1);
            }

            console.log('Nueva reserva en: ', fechaHoraInicio, fechaHoraFin);

            const response = await fetch('http://localhost:3000/reservas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fechaHoraInicio: fechaHoraInicio,
                    fechaHoraFin: fechaHoraFin,
                    userId: userId,
                    instalacionId: instalacionSeleccionada,
                    centroId: centroDeportivoId,
                }),
            });

            if (response.ok) {
                fetchReservas(instalacionSeleccionada);
            } else {
                console.error('Error creating reserva:', response);
            }
        }
    };

    const generarHoras = () => {
        const horas = [];
        for (let i = 10; i <= 22; i++) {
            horas.push(`${i < 10 ? '0' + i : i}:00`);
        }
        return horas;
    };

    const generarDiasSemana = () => {
        const diasSemana = [
            'Lunes',
            'Martes',
            'Miércoles',
            'Jueves',
            'Viernes',
            'Sábado',
            'Domingo',
        ];
        return diasSemana.map((dia, index) => {
            const fecha = fechasSemana[index];
            const diaMes = fecha ? ` ${fecha.getDate()}/${fecha.getMonth() + 1}` : '';
            return (
                <th key={dia}>
                    {dia}
                    {diaMes}
                </th>
            );
        });
    };

    const isHoraReservada = (hora: string, dia: string) => {
        return reservas.some((reserva) => {
            const inicioReserva = new Date(reserva.fechaHoraInicio);
            const diaReserva = `${inicioReserva.getFullYear()}-${(inicioReserva.getMonth() + 1)
                .toString()
                .padStart(2, '0')}-${inicioReserva.getDate().toString().padStart(2, '0')}`;
            const horaReserva = `${inicioReserva
                .getHours()
                .toString()
                .padStart(2, '0')}:${inicioReserva.getMinutes().toString().padStart(2, '0')}`;
            return (
                reserva.instalacionId === instalacionSeleccionada &&
                diaReserva === dia &&
                horaReserva === hora
            );
        });
    };

    const handleSemanaAnterior = () => {
        setSemanaOffset(semanaOffset - 1);
    };

    const handleSemanaSiguiente = () => {
        setSemanaOffset(semanaOffset + 1);
    };

    return (
        <div className="reservas-table">
            <select onChange={handleInstalacionChange} value={instalacionSeleccionada || ''}>
                <option value="" disabled>
                    Selecciona una instalación
                </option>
                {instalaciones.map((instalacion) => (
                    <option key={instalacion.instalacionId} value={instalacion.instalacionId}>
                        {instalacion.nombre}
                    </option>
                ))}
            </select>

            <div className="semana-controls">
                <button onClick={handleSemanaAnterior}>Semana Anterior</button>
                <button onClick={handleSemanaSiguiente}>Semana Siguiente</button>
            </div>

            {instalacionSeleccionada && (
                <table>
                    <thead>
                        <tr>
                            <th>Horas</th>
                            {generarDiasSemana()}
                        </tr>
                    </thead>
                    <tbody>
                        {generarHoras().map((hora) => (
                            <tr key={hora}>
                                <td>{hora}</td>
                                {fechasSemana.map((fecha) => {
                                    const dia = `${fecha.getFullYear()}-${(fecha.getMonth() + 1)
                                        .toString()
                                        .padStart(2, '0')}-${fecha
                                        .getDate()
                                        .toString()
                                        .padStart(2, '0')}`;
                                    return (
                                        <td
                                            key={dia}
                                            className={
                                                isHoraReservada(hora, dia)
                                                    ? 'reservada'
                                                    : 'disponible'
                                            }
                                            onClick={() =>
                                                !isHoraReservada(hora, dia) &&
                                                handleReservaClick(hora, dia)
                                            }
                                        >
                                            {isHoraReservada(hora, dia)
                                                ? 'Reservado'
                                                : 'Disponible'}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ReservasTable;
