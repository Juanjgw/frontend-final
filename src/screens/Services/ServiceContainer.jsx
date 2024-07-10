// src/screens/Services/ServiceContainer.jsx
import React, { useState, useEffect } from 'react';
import ServiceList from './ServiceList'; // Importamos el componente ServiceList
import { obtenerServicios } from '../../fetching/servicios.fetching'; // Asegúrate de importar correctamente tu función de fetch

const ServiceContainer = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const fetchedServices = await obtenerServicios();
        setServices(fetchedServices);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div>
      <h1>Lista de Servicios</h1>
      <ServiceList services={services} />
    </div>
  );
};

export default ServiceContainer;
