import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceList from '../Services/ServiceList'; 


const HomeScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleContact = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      // Lógica para contactar con el proveedor de servicios
    }
  };

  // Datos de prueba para servicios
  const services = [
    { id: 1, title: 'Servicio 1', description: 'Descripción del servicio 1.', rating: 4 },
    { id: 2, title: 'Servicio 2', description: 'Descripción del servicio 2.', rating: 4 },
    { id: 3, title: 'Servicio 3', description: 'Descripción del servicio 3.', rating: 4 },
    { id: 4, title: 'Servicio 4', description: 'Descripción del servicio 4.', rating: 4 },
    { id: 5, title: 'Servicio 5', description: 'Descripción del servicio 5.', rating: 4 },
  ];

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center my-4">
        <h1>Bienvenido!</h1>
        <button className="btn btn-danger" onClick={handleLogout}>Cerrar sesión</button>
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
}

export default HomeScreen;
