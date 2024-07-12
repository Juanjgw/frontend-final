import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import './ServiceCard.css';

const ServiceCard = ({ service, isLoggedIn, onWhatsAppClick }) => {
  const navigate = useNavigate();
  const { title, description, rating, contactNumber, imagen_url, id } = service;

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
    if (isLoggedIn) {
      const encodedMessage = encodeURIComponent(`Hola me contacto desde www.buscaConstructores.com.ar y necesito un presupuesto por ${title}`);
      const whatsappUrl = `https://wa.me/${contactNumber}?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank');
    } else {
      navigate('/login');
    }
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <div className="card mb-4">
      <div className="img-container">
        <img 
          src={imagen_url || "https://via.placeholder.com/300x300"} 
          className="card-img-top" 
          alt={title} 
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">{truncateText(title, 40)}</h5> {/* Truncar el título */}
        <p className="card-text card-description">{truncateText(description, 210)}</p> {/* Truncar la descripción */}
        <div className="star-rating">{renderStars()}</div>
        <div className="button-container">
          <button onClick={handleWhatsAppClick} className="whatsapp-button">
            <FontAwesomeIcon icon={faWhatsapp} style={{ marginRight: '5px' }} />
            WhatsApp
          </button>
          <button onClick={() => navigate(`/service/${id}`)} className="details-button">
            Detalles
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
