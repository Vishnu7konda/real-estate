import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiMapPin, FiCheckCircle, FiShare2, FiHeart, FiCheck } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import axios from 'axios';
import SEO from '../../components/seo/SEO';
import './PropertyDetails.css';

const PropertyDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquirySubmitting, setInquirySubmitting] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryError, setInquiryError] = useState('');

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

  const handleInquiry = async (e) => {
    e.preventDefault();
    setInquirySubmitting(true);
    setInquiryError('');
    try {
      await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/leads`, {
        name: inquiryName,
        phone: inquiryPhone,
        message: inquiryMessage || `Interested in: ${property?.title}`,
        propertyType: property?.propertyType || 'Any',
        budget: 'Not Specified',
        sourcePage: 'Property Details',
      });
      setInquirySubmitted(true);
      setInquiryName('');
      setInquiryPhone('');
      setInquiryMessage('');
    } catch (err) {
      setInquiryError('Failed to send request. Please try WhatsApp or call us directly.');
    } finally {
      setInquirySubmitting(false);
    }
  };

  if (loading) return <div className="loading-spinner" style={{ minHeight: '60vh' }}>{t('propertyDetails.loading')}</div>;
  if (!property) return <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>{t('propertyDetails.notFound')}</div>;

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
    "image": (property.images && property.images.length > 0) ? property.images[0] : 'https://placehold.co/600x400',
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
        image={(property.images && property.images.length > 0) ? property.images[0] : 'https://placehold.co/600x400'}
        schema={schema}
      />

      <div className="property-details-page bg-gray">
        <div className="container">
          {/* Breadcrumbs */}
          <div className="breadcrumbs">
            <Link to="/">{t('propertyDetails.homeBreadcrumb')}</Link> &gt; <Link to="/properties">{t('propertyDetails.propertiesBreadcrumb')}</Link> &gt; <span>{property.title}</span>
          </div>

          <div className="details-header">
            <div>
              <div className="details-badges">
                <span className="badge badge-primary">{t(`hero.propertyType${property.propertyType}`)}</span>
                <span className="badge badge-dark">{property.investmentType}</span>
              </div>
              <h1 className="details-title">{property.title}</h1>
              <p className="details-location"><FiMapPin /> {property.location}</p>
            </div>
            
            <div className="details-price-container">
              <div className="details-price">{formatPrice(property.price)}</div>
              <div className="details-actions">
                <button className="btn-icon" aria-label={t('propertyDetails.saveAria')}><FiHeart /></button>
                <button className="btn-icon" aria-label={t('propertyDetails.shareAria')}><FiShare2 /></button>
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="gallery-section">
            <div className="main-image">
              <img src={(property.images && property.images.length > 0) ? property.images[activeImage] : 'https://placehold.co/800x500/eaeaea/a3a3a3?text=No+Image+Available'} alt={`${property.title} - Main`} />
            </div>
            <div className="thumbnail-list">
              {property.images && property.images.length > 0 && property.images.map((img, index) => (
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
                <h2>{t('propertyDetails.overviewTitle')}</h2>
                <div className="description-text">
                  {property.description.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="details-card">
                <h2>{t('propertyDetails.highlightsTitle')}</h2>
                <ul className="highlights-list">
                  {property.highlights && property.highlights.map((highlight, index) => (
                    <li key={index}><FiCheckCircle className="check-icon" /> {highlight}</li>
                  ))}
                  {(!property.highlights || property.highlights.length === 0) && (
                    <li><FiCheckCircle className="check-icon" /> Premium Finish</li>
                  )}
                </ul>
              </div>

              <div className="details-card">
                <h2>{t('propertyDetails.amenitiesTitle')}</h2>
                <div className="amenities-grid">
                  {property.amenities && property.amenities.map((amenity, index) => (
                    <div key={index} className="amenity-item">{amenity}</div>
                  ))}
                  {(!property.amenities || property.amenities.length === 0) && (
                    <div className="amenity-item">Basic Amenities Available</div>
                  )}
                </div>
              </div>

              {property.mapLocation && (
                <div className="details-card">
                  <h2>{t('propertyDetails.locationTitle')}</h2>
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
                <h3>{t('propertyDetails.contactTitle')}</h3>
                <p>{t('propertyDetails.contactSubtitle')}</p>
                
                  {inquirySubmitted ? (
                    <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                      <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#D1FAE5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                        <FiCheck size={28} color="#059669" />
                      </div>
                      <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Request Sent!</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>We'll contact you within 24 hours about this property.</p>
                      <button onClick={() => setInquirySubmitted(false)} className="btn btn-outline" style={{ marginTop: '1rem', width: '100%' }}>Send Another Request</button>
                    </div>
                  ) : (
                    <form className="inquiry-form" onSubmit={handleInquiry}>
                      {inquiryError && (
                        <div style={{ backgroundColor: '#FEE2E2', color: '#991B1B', padding: '0.75rem', borderRadius: '0.375rem', marginBottom: '1rem', fontSize: '0.875rem' }}>
                          {inquiryError}
                        </div>
                      )}
                      <div className="input-group">
                        <input type="text" className="input-field" placeholder={t('propertyDetails.namePlaceholder')} required value={inquiryName} onChange={e => setInquiryName(e.target.value)} disabled={inquirySubmitting} />
                      </div>
                      <div className="input-group">
                        <input type="tel" className="input-field" placeholder={t('propertyDetails.phonePlaceholder')} required value={inquiryPhone} onChange={e => setInquiryPhone(e.target.value)} disabled={inquirySubmitting} />
                      </div>
                      <div className="input-group">
                        <textarea className="input-field" placeholder={t('propertyDetails.messagePlaceholder')} rows="3" value={inquiryMessage} onChange={e => setInquiryMessage(e.target.value)} disabled={inquirySubmitting}></textarea>
                      </div>
                      <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem' }} disabled={inquirySubmitting}>
                        {inquirySubmitting ? 'Sending...' : t('propertyDetails.requestDetailsBtn')}
                      </button>
                    </form>
                  )}

                <div className="separator"><span>{t('propertyDetails.orText')}</span></div>

                <a 
                  href={`https://wa.me/1234567890?text=${encodeURIComponent(`${t('propertyDetails.whatsappPrefix')}${property.title} listed for ${formatPrice(property.price)}.`)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn whatsapp-btn"
                >
                  <FaWhatsapp /> {t('propertyDetails.chatWhatsappBtn')}
                </a>
                
                <Link to="/contact" className="btn btn-outline" style={{ width: '100%' }}>
                  {t('propertyDetails.scheduleVisitBtn')}
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
