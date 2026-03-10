import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiMaximize2, FiPhoneCall } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import './PropertyCard.css';

const PropertyCard = ({ property }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleWhatsApp = (e) => {
    e.preventDefault();
    const phoneNumber = '1234567890'; // Replace with agent's actual number
    const message = `Hi, I am interested in the ${property.title} located at ${property.location} listed for ${formatPrice(property.price)}. Please provide more details.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="property-card hover-lift">
      <div className="property-image-container">
        <img src={property.images && property.images.length > 0 ? property.images[0] : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'} alt={property.title} className="property-image" />
        <div className="property-badges">
          <span className="badge badge-primary">{property.propertyType}</span>
          <span className="badge badge-dark">Featured</span>
        </div>
        <div className="property-price">{formatPrice(property.price)}</div>
      </div>
      
      <div className="property-content">
        <h3 className="property-title">
          <Link to={`/properties/${property._id}`}>{property.title}</Link>
        </h3>
        
        <div className="property-location">
          <FiMapPin className="location-icon" />
          <span>{property.location}</span>
        </div>
        
        <p className="property-description">
          {property.description.length > 80 ? `${property.description.substring(0, 80)}...` : property.description}
        </p>
        
        <div className="property-amenities">
          {property.amenities.slice(0, 3).map((amenity, index) => (
            <span key={index} className="amenity-tag">{amenity}</span>
          ))}
          {property.amenities.length > 3 && <span className="amenity-tag">+{property.amenities.length - 3}</span>}
        </div>
        
        <div className="property-card-actions">
          <Link to={`/properties/${property._id}`} className="btn-detail">
            View Details <FiMaximize2 />
          </Link>
          <button className="btn-whatsapp-sm" onClick={handleWhatsApp} aria-label="Inquire via WhatsApp">
            <FaWhatsapp />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
