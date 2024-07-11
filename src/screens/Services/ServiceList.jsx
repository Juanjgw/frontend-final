// src/screens/Services/ServiceList.jsx

import React from 'react';
import ServiceCard from './ServiceCard'; // Importamos el componente ServiceCard

const ServiceList = ({ services, isLoggedIn }) => {
  return (
    <div className="row">
      {services.map(service => (
        <div key={service.id} className="col-md-4">
          <ServiceCard isLoggedIn = {isLoggedIn}service={service} /> {/* Renderizamos cada ServiceCard con datos de servicio */}
        </div>
      ))}
    </div>
  );
}


export default ServiceList;