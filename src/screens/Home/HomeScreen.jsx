import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Borrar el token de localStorage
    localStorage.removeItem('token');
    
    // Redirigir al usuario a la página de inicio de sesión
    navigate('/login');
  };

  return (
    <div>
      <h1>Bienvenido!</h1>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default HomeScreen;
