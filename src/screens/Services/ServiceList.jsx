// src/screens/Services/ServiceList.jsx
import React from 'react';
import ServiceCard from './ServiceCard';

const ServiceList = ({ services }) => {
  return (
    <div className="row">
      {services.map(service => (
        <div key={service.id} className="col-md-4">
          <ServiceCard 
            service={service} 
            isAuthenticated={!!localStorage.getItem('token')}
            onWhatsAppClick={contactNumber => window.open(`https://wa.me/${contactNumber}`, '_blank')} 
          />
        </div>
      ))}
    </div>
  );
};

export default ServiceList;


