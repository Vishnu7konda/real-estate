import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiMapPin, FiMaximize2, FiPhoneCall } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import './PropertyCard.css';

const PropertyCard = ({ property }) => {
  const { t } = useTranslation();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleWhatsApp = (e) => {
    e.preventDefault();
    const phoneNumber = "919866081506"; // In reality this would come from agent profile
    const message = `${t('propertyCard.whatsappPrefix')}${property.title} located at ${property.location} listed for ${formatPrice(property.price)}. Please provide more details.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <Link to={`/properties/${property.id || property._id}`} className="property-card hover-lift" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
      <div className="property-image-container">
        <img src={property.images && property.images.length > 0 ? property.images[0] : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'} alt={property.title} className="property-image" />
        <div className="property-badges">
          <span className="badge badge-primary">{t(`hero.propertyType${property.propertyType}`)}</span>
          <span className="badge badge-dark">{t('propertyCard.featuredBadge')}</span>
        </div>
        <div className="property-price">{formatPrice(property.price)}</div>
      </div>
      
      <div className="property-content">
        <h3 className="property-title">
          {property.title}
        </h3>
        
        <div className="property-location">
          <FiMapPin className="location-icon" />
          <span>{property.location}</span>
        </div>
        
        <p className="property-description">
          {property.description.length > 80 ? `${property.description.substring(0, 80)}...` : property.description}
        </p>
        
        <div className="property-amenities">
          {property.amenities && property.amenities.slice(0, 3).map((amenity, index) => (
            <span key={index} className="amenity-tag">{amenity}</span>
          ))}
          {property.amenities && property.amenities.length > 3 && <span className="amenity-tag">+{property.amenities.length - 3}</span>}
        </div>
        
        <div className="property-card-actions">
          <span className="btn-detail" style={{ cursor: 'pointer' }}>
            {t('propertyCard.viewDetailsBtn')} <FiMaximize2 />
          </span>
          <button 
            className="btn-whatsapp-sm" 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation(); // Stop the click from bubbling up to the Link
              handleWhatsApp(e);
            }} 
            aria-label="Inquire via WhatsApp"
          >
            <FaWhatsapp />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
