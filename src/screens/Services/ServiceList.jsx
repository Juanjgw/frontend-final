import React from 'react';
import ServiceCard from './ServiceCard';

const ServiceList = ({ services, isLoggedIn, onWhatsAppClick }) => {
  return (
    <div className="container">
      <div className="row">
        {services.map((service, index) => (
          <div className="col-md-4" key={service.id || index}>
            <ServiceCard
              service={service}
              isLoggedIn={isLoggedIn}
              onWhatsAppClick={onWhatsAppClick}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceList;
