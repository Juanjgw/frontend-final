// src/screens/Services/ServiceList.jsx

import React from 'react';
import ServiceCard from './ServiceCard'; // Importamos el componente ServiceCard

const ServiceList = ({ services }) => {
  return (
    <div className="row">
      {services.map(service => (
        <div key={service.id} className="col-md-4">
          <ServiceCard service={service} /> {/* Renderizamos cada ServiceCard con datos de servicio */}
        </div>
      ))}
    </div>
  );
}


export default ServiceList;