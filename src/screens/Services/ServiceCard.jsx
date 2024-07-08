import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

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
      // Si el usuario está autenticado, llama a la función para abrir WhatsApp
      onWhatsAppClick(contactNumber);
    } else {
      // Si no está autenticado, manejar la lógica para mostrar el mensaje de inicio de sesión
      alert('Por favor, inicia sesión para ver el contacto de WhatsApp.');
      // Podrías redirigir al usuario a la página de inicio de sesión aquí si es necesario
    }
  };

  return (
    <div className="card mb-4">
      <img src="https://via.placeholder.com/300x200" className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <div className="star-rating">{renderStars()}</div>
        <button onClick={handleWhatsAppClick} className="btn btn-primary">
          <FontAwesomeIcon icon={faWhatsapp} />
          Contactar por WhatsApp
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;

