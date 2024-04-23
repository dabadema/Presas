import './App.css';
// import LoginForm from './components/LoginForm';
import NavBar from './components/NavBar';
import ReservasTable from './components/ReservasTable';
// import RegisterForm from './components/RegisterForm';

function App() {
    // const handleLogin = (email: string, password: string) => {
    //     // Aquí iría la lógica de autenticación, como una solicitud a un API
    //     console.log('Logging in with:', email, password);
    //     // Por ejemplo: axios.post('/api/login', { email, password })
    // };

    // const userInfo = {
    //     nombre: 'Superadministrador',
    //     tipo: 'Administrador', // o 'Usuario', 'Superadministrador'
    // };

    const reservasFicticias = [
        {
            usuario: 'Juan Pérez',
            centroDeportivo: 'Centro City',
            instalacion: 'Cancha de Fútbol',
            horaInicio: '10:00',
            horaFin: '12:00',
        },
        {
            usuario: 'Ana Gómez',
            centroDeportivo: 'Centro River',
            instalacion: 'Piscina Olímpica',
            horaInicio: '15:00',
            horaFin: '16:00',
        },
        {
            usuario: 'Luis Martín',
            centroDeportivo: 'Centro Mountain',
            instalacion: 'Pista de Tenis',
            horaInicio: '12:00',
            horaFin: '13:30',
        },
    ];

    return (
        <div>
            {/* <LoginForm onLogin={handleLogin} /> */}
            {/* <RegisterForm /> */}
            {/* <NavBar userInfo={userInfo} /> */}
            <ReservasTable reservas={reservasFicticias} />
        </div>
    );
}

export default App;
