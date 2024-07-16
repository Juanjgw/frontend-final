import React from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';
import './ServiceDetail.css';

const ServiceDetail = ({ services }) => {
  const { id } = useParams();
  const service = services.find(service => service.id === parseInt(id));

  if (!service) {
    return <p>Servicio no encontrado</p>;
  }

  const { title, description, imagen_url, logo_url, socialLinks } = service;

  return (
    <div className="service-detail">
      <div className="img-container">
        <img src={"https://eshopcompany.com/Servicios/" + imagen_url || "https://via.placeholder.com/300x300"} alt={title} />
      </div>
      <div className="service-detail-body">
        <h1>{title}</h1>
        <p>{description}</p>
        <img src={logo_url} alt="Logo de la empresa" className="company-logo" />
        <div className="social-links">
          <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
          <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
          <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTiktok} size="2x" />
          </a>
          <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faYoutube} size="2x" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
