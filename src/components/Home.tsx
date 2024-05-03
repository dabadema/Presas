import React, { useState, useEffect } from 'react';
import './Home.css';

type UserInfo = {
    nombre: string;
    tipoUsuario: string;
    centroId: string | null;
};

type CentroDeportivo = {
    nombre: string; // Asegúrate de que estos campos coincidan con la respuesta del endpoint
};

const Home = () => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>({
        nombre: '',
        tipoUsuario: '',
        centroId: '',
    });
    const [centroNombre, setCentroNombre] = useState('');

    useEffect(() => {
        // Obtener la cadena de localStorage y parsearla a objeto
        const storedData = localStorage.getItem('userData');
        console.log(storedData);
        if (storedData) {
            const userData = JSON.parse(storedData);
            console.log('Datos parseados de localStorage:', userData);

            // Asumiendo que 'nombre' y 'tipoUsuario' están en el objeto almacenado
            setUserInfo({
                nombre: userData.nombre,
                tipoUsuario: userData.tipoUsuario,
                centroId: userData.centroId,
            });
        }
    }, []);

    useEffect(() => {
        if (userInfo?.centroId) {
            fetch(`http://localhost:3000/centros-deportivos/${userInfo.centroId}`)
                .then((response) => response.json())
                .then((data: CentroDeportivo[]) => {
                    if (data.length > 0) {
                        setCentroNombre(data[0].nombre); // Asegúrate de que el endpoint devuelve un array y que usamos el primer elemento
                    }
                })
                .catch((error) => console.error('Failed to fetch centro deportivo', error));
        }
    }, [userInfo?.centroId]);

    return (
        <div className="home-container">
            {userInfo?.tipoUsuario === 'superadministrador' ? (
                <>
                    <h1 className="underline">
                        Bienvenido <span className="username">{userInfo.nombre}</span>!
                    </h1>
                    <p>Vamos a por una jornada de trabajo con alegría! &nbsp; A por todas!</p>
                </>
            ) : (
                <>
                    <h1 className="underline">
                        Bienvenido <span className="username">{userInfo.nombre}</span>!
                    </h1>
                    {userInfo?.centroId && centroNombre && (
                        <div>
                            Perteneces al centro deportivo:
                            <div>
                                <span className="centro-deportivo">{centroNombre}</span>
                            </div>
                        </div>
                    )}
                    &nbsp;
                    <p>
                        Gracias por confiar en nosotros para cuidar de tu salud y bienestar,
                        esperamos que disfrutes la plataforma!
                    </p>
                </>
            )}
        </div>
    );
};

export default Home;
