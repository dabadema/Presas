import React, { useEffect, useState } from 'react';
import './ReservasTable.css';

export type Reserva = {
    usuario: string;
    instalacion: string;
    horaInicio: string;
    horaFin: string;
    dia: string;
};

type ReservasTableProps = {
    reservas: Reserva[];
    instalaciones: string[];
};

const ReservasTable: React.FC<ReservasTableProps> = ({}) => {
    const [reservas, setReservas] = useState<Reserva[]>([]);
    const [instalaciones, setInstalaciones] = useState<Instalacion[]>([]);
    const [centroDeportivo, setCentroDeportivo] = useState<string | null>(null);
    const [instalacionSeleccionada, setInstalacionSeleccionada] = useState<string | null>(null);
    const [tipoUsuario, setTipoUsuario] = useState<string | null>(null);
    const [fechasSemana, setFechasSemana] = useState<Date[]>([]);
    const [semanaOffset, setSemanaOffset] = useState<number>(0);

    useEffect(() => {
        const userDataString = localStorage.getItem('userData');
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            setTipoUsuario(userData.tipoUsuario);
            console.log('usuario logueado', userData.tipoUsuario);
        }

        const fetchCentroDeportivo = async () => {
            const userDataString = localStorage.getItem('userData');
            if (userDataString) {
                const userData = JSON.parse(userDataString);
                const response = await fetch(
                    `http://localhost:3000/centros-deportivos/${userData.centroId}`
                );
                const data = await response.json();
                console.log('fetch centros deportivos', data);
                if (response.ok) {
                    setCentroDeportivo(data[0]);
                    console.log('fetch centros deportivos', centroDeportivo);
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

    const handleInstalacionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setInstalacionSeleccionada(event.target.value);
    };

    const handleReservaClick = (hora: string, dia: string) => {
        if (instalacionSeleccionada && tipoUsuario) {
            const nuevaReserva: Reserva = {
                horaInicio: hora,
                horaFin: (parseInt(hora) + 1).toString().padStart(2, '0') + ':00',
                dia: dia,
                instalacion: instalacionSeleccionada,
                usuario: tipoUsuario,
            };
            setReservas([...reservas, nuevaReserva]);
        }
    };

    // Función para generar las horas de 10:00 a 22:00
    const generarHoras = () => {
        const horas = [];
        for (let i = 10; i <= 22; i++) {
            horas.push(`${i < 10 ? '0' + i : i}:00`);
        }
        return horas;
    };

    // Función para generar los días de la semana con fecha
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

    // Función para comprobar si una hora está reservada
    const isHoraReservada = (hora: string, dia: string) => {
        return reservas.some(
            (reserva) =>
                reserva.horaInicio === hora &&
                reserva.instalacion === instalacionSeleccionada &&
                reserva.dia === dia
        );
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
                    <option key={instalacion.id} value={instalacion.id}>
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
                                {[
                                    'Lunes',
                                    'Martes',
                                    'Miércoles',
                                    'Jueves',
                                    'Viernes',
                                    'Sábado',
                                    'Domingo',
                                ].map((dia, index) => (
                                    <td
                                        key={dia}
                                        className={
                                            isHoraReservada(hora, dia) ? 'reservada' : 'disponible'
                                        }
                                        onClick={() =>
                                            !isHoraReservada(hora, dia) &&
                                            handleReservaClick(hora, dia)
                                        }
                                    >
                                        {isHoraReservada(hora, dia) ? 'Reservado' : 'Disponible'}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ReservasTable;
