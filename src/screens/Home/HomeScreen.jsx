import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceList from '../Services/ServiceList';
import { verificarToken } from '../../fetching/auth.fetching';
import { obtenerServicios } from '../../fetching/service.fetching';

const HomeScreen = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [services, setServices] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }

        const fetchServices = async () => {
            try {
                const servicios = await obtenerServicios();
                console.log('Servicios obtenidos:', servicios); // Agregar console.log aquí
                setServices(servicios);
            } catch (error) {
                console.error('Error al obtener servicios:', error); // Agregar console.error aquí
            }
        };

        fetchServices();
    }, []);

    const handleLogin = () => {
        navigate('/login');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login');
    };

    const handleContact = (serviceId) => {
        if (!isLoggedIn) {
            navigate('/login');
        } else {
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


