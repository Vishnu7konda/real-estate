import React, { useState } from 'react';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import SEO from '../../components/seo/SEO';
import '../Properties/Properties.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    budget: '',
    propertyType: 'Any',
    message: ''
  });
  const [status, setStatus] = useState('');

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
        setFormData({ name: '', phone: '', email: '', budget: '', propertyType: 'Any', message: '' });
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
        title="Contact Us & Book Site Visit" 
        description="Get in touch with Prime Estates to schedule a site visit or request a call back."
      />
      
      <div className="bg-gray">
        {/* Page Header */}
        <div className="page-header">
          <div className="container">
            <h1 className="page-title">Get In Touch</h1>
            <p className="page-subtitle">We are here to help you find your dream property.</p>
          </div>
        </div>

        <div className="container" style={{ paddingBottom: '6rem' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            
            {/* Contact Information Column */}
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>Contact Information</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.6' }}>
                Whether you have a question about a property, want to schedule a site visit, or need investment advice, our team is ready to answer all your questions.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ width: '50px', height: '50px', backgroundColor: 'var(--surface)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)', fontSize: '1.5rem', flexShrink: 0, boxShadow: 'var(--shadow-sm)' }}>
                    <FiMapPin />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>Office Address</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>123 Elite Realty Avenue<br />Business Park, CA 90210</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ width: '50px', height: '50px', backgroundColor: 'var(--surface)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)', fontSize: '1.5rem', flexShrink: 0, boxShadow: 'var(--shadow-sm)' }}>
                    <FiPhone />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>Phone & WhatsApp</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>+1 (555) 123-4567</p>
                    <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#25D366', fontWeight: '500' }}>
                      <FaWhatsapp /> Chat on WhatsApp
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ width: '50px', height: '50px', backgroundColor: 'var(--surface)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)', fontSize: '1.5rem', flexShrink: 0, boxShadow: 'var(--shadow-sm)' }}>
                    <FiMail />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>Email Us</h3>
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
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Send us a Message</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Fill out the form below and we will get back to you within 24 hours.</p>

                {status === 'success' ? (
                  <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', padding: '1.5rem', borderRadius: '0.5rem', textAlign: 'center', border: '1px solid var(--success)' }}>
                    <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Message Sent Successfully!</h4>
                    <p>Thank you for reaching out. One of our agents will contact you shortly.</p>
                    <button 
                      onClick={() => setStatus('')} 
                      className="btn btn-outline" 
                      style={{ marginTop: '1rem' }}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                      <div>
                        <label className="input-label" htmlFor="name">Full Name *</label>
                        <input type="text" id="name" name="name" className="input-field" value={formData.name} onChange={handleChange} required />
                      </div>
                      <div>
                        <label className="input-label" htmlFor="phone">Phone Number *</label>
                        <input type="tel" id="phone" name="phone" className="input-field" value={formData.phone} onChange={handleChange} required />
                      </div>
                    </div>

                    <div>
                      <label className="input-label" htmlFor="email">Email Address</label>
                      <input type="email" id="email" name="email" className="input-field" value={formData.email} onChange={handleChange} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                      <div>
                        <label className="input-label" htmlFor="propertyType">Interested In</label>
                        <select id="propertyType" name="propertyType" className="input-field" value={formData.propertyType} onChange={handleChange}>
                          <option value="Any">Any Property Type</option>
                          <option value="Plot">Plots / Land</option>
                          <option value="Villa">Villas / Houses</option>
                          <option value="Apartment">Apartments</option>
                          <option value="Commercial">Commercial Spaces</option>
                        </select>
                      </div>
                      <div>
                        <label className="input-label" htmlFor="budget">Estimated Budget *</label>
                        <select id="budget" name="budget" className="input-field" value={formData.budget} onChange={handleChange} required>
                          <option value="" disabled>Select Budget</option>
                          <option value="Under ₹5Cr">Under ₹5Cr</option>
                          <option value="₹5Cr - ₹10Cr">₹5Cr - ₹10Cr</option>
                          <option value="₹10Cr - ₹20Cr">₹10Cr - ₹20Cr</option>
                          <option value="₹20Cr - ₹50Cr">₹20Cr - ₹50Cr</option>
                          <option value="Above ₹50Cr">Above ₹50Cr</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="input-label" htmlFor="message">Message</label>
                      <textarea 
                        id="message" 
                        name="message" 
                        className="input-field" 
                        rows="4" 
                        placeholder="I would like to schedule a site visit for..."
                        value={formData.message} 
                        onChange={handleChange}
                      ></textarea>
                    </div>

                    {status === 'error' && (
                      <div style={{ color: 'var(--error)', fontSize: '0.875rem' }}>
                        Failed to submit the form. Please check your connection or try again later.
                      </div>
                    )}

                    <button 
                      type="submit" 
                      className="btn btn-primary" 
                      style={{ padding: '1rem' }}
                      disabled={status === 'submitting'}
                    >
                      {status === 'submitting' ? 'Submitting...' : 'Send Message'}
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
