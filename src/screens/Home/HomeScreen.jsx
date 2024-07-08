import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceList from '../Services/ServiceList';
import { verificarToken } from '../../fetching/auth.fetching';

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

        // Cargar los servicios al montar el componente (dummyServices solo como ejemplo)
        const dummyServices = [
            { id: 1, title: 'Servicio 1', description: 'Descripción del servicio 1.', rating: 4 },
            { id: 2, title: 'Servicio 2', description: 'Descripción del servicio 2.', rating: 4 },
            { id: 3, title: 'Servicio 3', description: 'Descripción del servicio 3.', rating: 4 },
            { id: 4, title: 'Servicio 4', description: 'Descripción del servicio 4.', rating: 4 },
            { id: 5, title: 'Servicio 5', description: 'Descripción del servicio 5.', rating: 4 },
        ];
        setServices(dummyServices);
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
            <ServiceList services={filteredServices} handleContact={handleContact} />
        </div>
    );
};

export default HomeScreen;

