import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceList from '../Services/ServiceList';
import { verificarToken } from '../../fetching/auth.fetching';
import axios from "axios"

const HomeScreen = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [services, setServices] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para manejar si el usuario está autenticado

    useEffect(() => {
        // Verificar si existe un token en localStorage para determinar si el usuario está autenticado
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
axios.get ("http://localhost:4040/api/servicios?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBlcGUxNDNAZ21haWwuY29tIiwidXNlcl9pZCI6NDgsImlhdCI6MTcyMDU5NTc5NywiZXhwIjoxNzIwNTk5Mzk3fQ.t8mC94nMwMzmQLVxGJ1cXsZuLbmpvw8nHnrbrXqHovM")
       .then ((data)=> {
        console.log(data)

        setServices(data.data.servicios)})

       
    }, []);

    const handleLogin = () => {
        navigate('/login');
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remover el token del localStorage
        setIsLoggedIn(false); // Actualizar el estado de isLoggedIn a falso
        navigate('/login');
    };

    const handleContact = (serviceId) => {
        if (!isLoggedIn) {
            navigate('/login');
        } else {
            // Lógica para contactar con el proveedor de servicios
            console.log(`Contactar al proveedor de servicios: ${serviceId}`);
        }
    };

    const filteredServices = services.filter(service =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center my-4">
                <h1>Bienvenido!</h1>
                {isLoggedIn ? (
                    <button className="btn btn-danger" onClick={handleLogout}>Cerrar sesión</button>
                ) : (
                    <button className="btn btn-primary" onClick={handleLogin}>Iniciar sesión</button>
                )}
            </div>
            <div className="row search-bar mb-4">
                <div className="col-md-12">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar servicios..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <ServiceList services={filteredServices} isLoggedIn={isLoggedIn} handleContact={handleContact} />
        </div>
    );
};

export default HomeScreen;

