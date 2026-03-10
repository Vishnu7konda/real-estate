import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiMapPin, FiCheckCircle, FiShare2, FiHeart } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import axios from 'axios';
import SEO from '../../components/seo/SEO';
import './PropertyDetails.css';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/properties/${id}`);
        setProperty(response.data);
      } catch (error) {
        console.error('Error fetching property data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  if (loading) return <div className="loading-spinner" style={{ minHeight: '60vh' }}>Loading property details...</div>;
  if (!property) return <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>Property not found</div>;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": property.title,
    "description": property.description,
    "image": property.images[0],
    "offers": {
      "@type": "Offer",
      "price": property.price,
      "priceCurrency": "INR"
    }
  };

  return (
    <>
      <SEO 
        title={property.title} 
        description={property.description.substring(0, 150)} 
        image={property.images[0]}
        schema={schema}
      />

      <div className="property-details-page bg-gray">
        <div className="container">
          {/* Breadcrumbs */}
          <div className="breadcrumbs">
            <Link to="/">Home</Link> &gt; <Link to="/properties">Properties</Link> &gt; <span>{property.title}</span>
          </div>

          <div className="details-header">
            <div>
              <div className="details-badges">
                <span className="badge badge-primary">{property.propertyType}</span>
                <span className="badge badge-dark">{property.investmentType}</span>
              </div>
              <h1 className="details-title">{property.title}</h1>
              <p className="details-location"><FiMapPin /> {property.location}</p>
            </div>
            
            <div className="details-price-container">
              <div className="details-price">{formatPrice(property.price)}</div>
              <div className="details-actions">
                <button className="btn-icon" aria-label="Save Property"><FiHeart /></button>
                <button className="btn-icon" aria-label="Share Property"><FiShare2 /></button>
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="gallery-section">
            <div className="main-image">
              <img src={property.images[activeImage]} alt={`${property.title} - Main`} />
            </div>
            <div className="thumbnail-list">
              {property.images.map((img, index) => (
                <div 
                  key={index} 
                  className={`thumbnail ${activeImage === index ? 'active' : ''}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img src={img} alt={`${property.title} ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="details-grid">
            {/* Left Content Column */}
            <div className="details-main">
              <div className="details-card">
                <h2>Overview</h2>
                <div className="description-text">
                  {property.description.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="details-card">
                <h2>Property Highlights</h2>
                <ul className="highlights-list">
                  {property.highlights.map((highlight, index) => (
                    <li key={index}><FiCheckCircle className="check-icon" /> {highlight}</li>
                  ))}
                </ul>
              </div>

              <div className="details-card">
                <h2>Amenities</h2>
                <div className="amenities-grid">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="amenity-item">{amenity}</div>
                  ))}
                </div>
              </div>

              {property.mapLocation && (
                <div className="details-card">
                  <h2>Location</h2>
                  <div className="map-container">
                    <iframe 
                      src={property.mapLocation} 
                      width="100%" 
                      height="400" 
                      style={{ border: 0 }} 
                      allowFullScreen="" 
                      loading="lazy" 
                      title="Property Location Map"
                    ></iframe>
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar Column */}
            <div className="details-sidebar">
              <div className="contact-agent-card sticky">
                <h3>Interested in this property?</h3>
                <p>Contact our experts to schedule a site visit or request more information.</p>
                
                <form className="inquiry-form" onSubmit={(e) => e.preventDefault()}>
                  <div className="input-group">
                    <input type="text" className="input-field" placeholder="Your Name" required />
                  </div>
                  <div className="input-group">
                    <input type="tel" className="input-field" placeholder="Phone Number" required />
                  </div>
                  <div className="input-group">
                    <textarea className="input-field" placeholder="I'm interested in this property..." rows="3"></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem' }}>
                    Request Details
                  </button>
                </form>

                <div className="separator"><span>OR</span></div>

                <a 
                  href={`https://wa.me/1234567890?text=${encodeURIComponent(`Hi, I want to know more about ${property.title} listed for ${formatPrice(property.price)}.`)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn whatsapp-btn"
                >
                  <FaWhatsapp /> Chat on WhatsApp
                </a>
                
                <Link to="/contact" className="btn btn-outline" style={{ width: '100%' }}>
                  Schedule Site Visit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyDetails;
