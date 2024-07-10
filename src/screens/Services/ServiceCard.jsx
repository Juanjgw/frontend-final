// src/screens/Services/ServiceCard.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import './ServiceCard.css';

const ServiceCard = ({ service, isAuthenticated, onWhatsAppClick }) => {
  const { title, description, rating, contactNumber } = service;

  const renderStars = () => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span key={i} style={{ color: i < rating ? '#ffd700' : '#ccc' }}>
          &#9733;
        </span>
      ));
  };

  const handleWhatsAppClick = () => {
    if (isAuthenticated) {
      onWhatsAppClick(contactNumber);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="card mb-4">
      <img src="https://via.placeholder.com/300x200" className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <div className="star-rating">{renderStars()}</div>
        <button onClick={handleWhatsAppClick} className="btn whatsapp-button">
          <FontAwesomeIcon icon={faWhatsapp} style={{ marginRight: '5px' }} />
          Contactar por WhatsApp
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
