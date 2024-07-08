import React from 'react';

const ServiceCard = ({ service }) => {
  const { title, description, rating } = service;

  const renderStars = () => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span key={i} style={{ color: i < rating ? '#ffd700' : '#ccc' }}>
          &#9733;
        </span>
      ));
  };

  return (
    <div className="card mb-4">
      <img src="https://via.placeholder.com/300x200" className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <div className="star-rating">{renderStars()}</div>
      </div>
    </div>
  );
}

export default ServiceCard;
