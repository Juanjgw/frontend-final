import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import './ServiceCard.css';

const ServiceCard = ({ service, isLoggedIn }) => {
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
    if (isLoggedIn && contactNumber) {
      const encodedMessage = encodeURIComponent(`Hola, me contacto desde www.ContrataExpertos.com.ar y necesito un presupuesto por ${title}`);
      const whatsappUrl = `https://api.whatsapp.com/send/?phone=${contactNumber}&text=${encodedMessage}&type=phone_number&app_absent=0`;
      window.open(whatsappUrl, '_blank');
    } else if (isLoggedIn && !contactNumber) {
      console.error('El número de contacto no está definido en el servicio.');
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

  const imageUrl = imagen_url && imagen_url[0] ? `https://www.contrataexpertos.com.ar/Servicios/Imagenes/${imagen_url[0]}` : "https://www.contrataexpertos.com.ar/ImagenesSistema/LogoContrataExpertos.jpeg";

  return (
    <div className="card mb-4">
      <div className="img-container">
        <img 
          src={imageUrl}
          className="card-img-top" 
          alt={title} 
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">{truncateText(title, 40)}</h5>
        <p className="card-text card-description">{truncateText(description, 210)}</p>
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
