import React from 'react';
import './AvatarDashboard.css';
import userPNG from '../utils/user.png';

interface AvatarProps {
    nombre: string;
    tipoUsuario: string;
}

const Avatar: React.FC<AvatarProps> = ({ nombre, tipoUsuario }) => {
    return (
        <div className="avatar-container">
            <div className="avatar-icon">
                <img src={userPNG} alt="User Icon" className="avatar-image" />
            </div>
            <div className="avatar-info">
                <p className="avatar-name">{nombre}</p>
                <p className="avatar-role">{tipoUsuario}</p>
            </div>
        </div>
    );
};

export default Avatar;
