import React from 'react';
import ServiceCard from './ServiceCard';

const ServiceList = ({ services, isLoggedIn, handleContact }) => {
  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {services.map((service, index) => (
          <div className="col" key={service.id || index}>
            <ServiceCard
              service={service}
              isLoggedIn={isLoggedIn}
              onContact={handleContact}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceList;

