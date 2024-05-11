import React from 'react';
import './Reservas.css';

const Reservas = () => {
    return (
        <>
            <div className="title-reservas">
                <h1>Reservas</h1>
            </div>
            <div className="under-construction">
                <img
                    src="https://koba-live.com/wp-content/uploads/2022/03/e14f7f30870d94e8bbc1021c5940d549.gif"
                    alt="Under Construction"
                    className="under-construction-gif"
                />
                <p className="under-construction-text">
                    Sentimos las molestias, esta funcionalidad estará disponible muy pronto!
                </p>
            </div>
        </>
    );
};

export default Reservas;
