import React from 'react';
import ServiceCard from './ServiceCard';

const ServiceList = ({ services, isLoggedIn, onWhatsAppClick }) => {
  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {services.map((service, index) => (
          <div className="col" key={service.id || index}>
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
