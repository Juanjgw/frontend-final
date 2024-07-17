import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import './ServiceDetail.css';
import { URL } from '../../fetching/http';

const ServiceDetail = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(`${URL.URL_API}/api/servicios/${id}`);
        setService(response.data.servicio);
        setError('');
        console.log(response);
      } catch (error) {
        setError('Error al cargar el servicio.');
      }
    };

    fetchService();
  }, [id]);

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span key={i} style={{ color: i < rating ? '#ffd700' : '#ccc' }}>
          &#9733;
        </span>
      ));
  };

  const handleWhatsAppClick = () => {
    if (isLoggedIn && service.contactNumber) {
      const encodedMessage = encodeURIComponent(`Hola, me contacto desde www.example.com y necesito un presupuesto por ${service.title}`);
      const whatsappUrl = `https://api.whatsapp.com/send/?phone=${service.contactNumber}&text=${encodedMessage}&type=phone_number&app_absent=0`;
      window.open(whatsappUrl, '_blank');
    } else if (isLoggedIn && !service.contactNumber) {
      console.error('El número de contacto no está definido en el servicio.');
    } else {
      navigate('/login');
    }
  };

  const truncateText = (text, maxLength) => {
    if (!text) return ''; // Manejar caso donde text es null o undefined

    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  const handleClose = () => {
    navigate('/home');
  };

  if (!service) {
    return <div>Cargando servicio...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const imageUrl = service.imagen_url ? `https://eshopcompany.com/Servicios/${service.imagen_url}` : 'https://via.placeholder.com/300x400';

  return (
    <div className="service-detail-card mb-4">
      <button onClick={handleClose} className="service-detail-close-button">Cerrar</button>
      <div className="service-detail-img-container">
        <img
          src={imageUrl}
          className="card-img-top"
          alt={service.title}
        />
      </div>
      <div className="service-detail-body">
        <h5 className="service-detail-title">{truncateText(service.title, 40)}</h5>
        <p className="service-detail-description">{service.description}</p>
        <div className="service-detail-star-rating">{renderStars(service.rating)}</div>
        <div className="service-detail-button-container">
          <button onClick={handleWhatsAppClick} className="service-detail-whatsapp-button">
            <FontAwesomeIcon icon={faWhatsapp} style={{ marginRight: '5px' }} />
            WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
