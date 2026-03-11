import React from 'react';
import { createPortal } from 'react-dom';
import { FaWhatsapp } from 'react-icons/fa';
import './FloatingWhatsApp.css';

const FloatingWhatsApp = () => {
  const phoneNumber = "919866081506"; // Replace with actual WhatsApp number
  const message = 'Hello, I am interested in your property listings. Please share available options.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return createPortal(
    <a 
      href={whatsappUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className="floating-whatsapp"
      aria-label="Chat on WhatsApp"
    >
      <div className="whatsapp-icon-container">
        <FaWhatsapp className="whatsapp-icon" />
      </div>
      <span className="whatsapp-tooltip">Chat with us!</span>
    </a>,
    document.body
  );
};

export default FloatingWhatsApp;
