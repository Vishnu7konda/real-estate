import React, { useState } from 'react';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import Dropdown from '../../components/ui/Dropdown';
import SEO from '../../components/seo/SEO';
import '../Properties/Properties.css';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    budget: '50000000',
    propertyType: 'Any',
    message: ''
  });
  const [status, setStatus] = useState('');

  const propertyTypeOptions = [
    { value: 'Any', label: t('hero.propertyTypeAny') },
    { value: 'Plot', label: t('hero.propertyTypePlot') },
    { value: 'Villa', label: t('hero.propertyTypeVilla') },
    { value: 'Apartment', label: t('hero.propertyTypeApartment') },
    { value: 'Commercial', label: t('hero.propertyTypeCommercial') }
  ];

  const formatBudget = (value) => {
    const num = Number(value);
    if (num >= 10000000) return `₹${+(num / 10000000).toFixed(2)} Cr`;
    if (num >= 100000) return `₹${+(num / 100000).toFixed(2)} L`;
    return `₹${num.toLocaleString('en-IN')}`;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      // Send to backend API
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          sourcePage: 'Contact Form'
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', phone: '', email: '', budget: '50000000', propertyType: 'Any', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };

  return (
    <>
      <SEO 
        title={t('contactPage.seoTitle')} 
        description={t('contactPage.seoDescription')}
      />
      
      <div className="bg-gray">
        {/* Page Header */}
        <div className="page-header">
          <div className="container">
            <h1 className="page-title">{t('contactPage.pageTitle')}</h1>
            <p className="page-subtitle">{t('contactPage.pageSubtitle')}</p>
          </div>
        </div>

        <div className="container" style={{ paddingBottom: '6rem' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            
            {/* Contact Information Column */}
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>{t('contactPage.contactInfoTitle')}</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.6' }}>
                {t('contactPage.contactInfoDesc')}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ width: '50px', height: '50px', backgroundColor: 'var(--surface)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)', fontSize: '1.5rem', flexShrink: 0, boxShadow: 'var(--shadow-sm)' }}>
                    <FiMapPin />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>{t('contactPage.officeAddressLabel')}</h3>
                    <p style={{ color: 'var(--text-secondary)' }} dangerouslySetInnerHTML={{ __html: t('contactPage.officeAddressVal') }}></p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ width: '50px', height: '50px', backgroundColor: 'var(--surface)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)', fontSize: '1.5rem', flexShrink: 0, boxShadow: 'var(--shadow-sm)' }}>
                    <FiPhone />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>{t('contactPage.phoneLabel')}</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>+91 98660 81506</p>
                    <a href="https://wa.me/919866081506" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#25D366', fontWeight: '500' }}>
                      <FaWhatsapp /> {t('contactPage.chatWhatsapp')}
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ width: '50px', height: '50px', backgroundColor: 'var(--surface)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)', fontSize: '1.5rem', flexShrink: 0, boxShadow: 'var(--shadow-sm)' }}>
                    <FiMail />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>{t('contactPage.emailLabel')}</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>info@primeestates.com</p>
                  </div>
                </div>
              </div>

              {/* Map Embed */}
              <div style={{ borderRadius: '0.5rem', overflow: 'hidden', height: '300px', boxShadow: 'var(--shadow-md)' }}>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105655.8580227917!2d-118.4904128038148!3d34.09347895475376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc04d6d147ab%3A0xd6c7c379fd081ed1!2sBeverly%20Hills%2C%20CA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  title="Office Location Map"
                ></iframe>
              </div>
            </div>

            {/* Contact Form Column */}
            <div>
              <div style={{ backgroundColor: 'var(--surface)', padding: '2.5rem', borderRadius: '1rem', boxShadow: 'var(--shadow-md)' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>{t('contactPage.formTitle')}</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>{t('contactPage.formSubtitle')}</p>

                {status === 'success' ? (
                  <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', padding: '1.5rem', borderRadius: '0.5rem', textAlign: 'center', border: '1px solid var(--success)' }}>
                    <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{t('contactPage.successTitle')}</h4>
                    <p>{t('contactPage.successDesc')}</p>
                    <button 
                      onClick={() => setStatus('')} 
                      className="btn btn-outline" 
                      style={{ marginTop: '1rem' }}
                    >
                      {t('contactPage.sendAnotherBtn')}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                      <div>
                        <label className="input-label" htmlFor="name">{t('contactPage.nameLabelInput')}</label>
                        <input type="text" id="name" name="name" className="input-field" value={formData.name} onChange={handleChange} required />
                      </div>
                      <div>
                        <label className="input-label" htmlFor="phone">{t('contactPage.phoneLabelInput')}</label>
                        <input type="tel" id="phone" name="phone" className="input-field" value={formData.phone} onChange={handleChange} required />
                      </div>
                    </div>

                    <div>
                      <label className="input-label" htmlFor="email">{t('contactPage.emailLabelInput')}</label>
                      <input type="email" id="email" name="email" className="input-field" value={formData.email} onChange={handleChange} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                      <div>
                        <label className="input-label" htmlFor="propertyType">{t('contactPage.interestedInLabel')}</label>
                        <Dropdown 
                          options={propertyTypeOptions}
                          value={formData.propertyType}
                          onChange={(val) => setFormData({ ...formData, propertyType: val })}
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        <label className="input-label" htmlFor="budget" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          {t('contactPage.maxBudgetLabel')} 
                          <span style={{ color: 'var(--primary)', fontWeight: '600' }}>{formatBudget(formData.budget)}</span>
                        </label>
                        <input 
                          type="range" 
                          id="budget" 
                          name="budget" 
                          className="input-field" 
                          style={{ padding: '0', cursor: 'ew-resize', accentColor: 'var(--secondary)', border: 'none' }}
                          min="1000000" 
                          max="50000000" 
                          step="1000000"
                          value={formData.budget} 
                          onChange={handleChange} 
                          required 
                        />
                      </div>
                    </div>

                    <div>
                      <label className="input-label" htmlFor="message">{t('contactPage.messageLabel')}</label>
                      <textarea 
                        id="message" 
                        name="message" 
                        className="input-field" 
                        rows="4" 
                        placeholder={t('contactPage.messagePlaceholder')}
                        value={formData.message} 
                        onChange={handleChange}
                      ></textarea>
                    </div>

                    {status === 'error' && (
                      <div style={{ color: 'var(--error)', fontSize: '0.875rem' }}>
                        {t('contactPage.errorMsg')}
                      </div>
                    )}

                    <button 
                      type="submit" 
                      className="btn btn-primary" 
                      style={{ padding: '1rem' }}
                      disabled={status === 'submitting'}
                    >
                      {status === 'submitting' ? t('contactPage.submittingBtn') : t('contactPage.submitBtn')}
                    </button>
                    
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
