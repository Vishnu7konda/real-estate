import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiPhone, FiMail, FiFacebook, FiInstagram, FiTwitter, FiLinkedin } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container footer-container">
        
        {/* Brand Column */}
        <div className="footer-col brand-col">
          <Link to="/" className="footer-logo">
            Prime<span>Estates</span>
          </Link>
          <p className="footer-description">
            Trusted real estate guidance for plots, villas, and premium properties. Your reliable partner in finding the perfect investment.
          </p>
          <div className="social-links">
            <a href="#" aria-label="Facebook"><FiFacebook /></a>
            <a href="#" aria-label="Instagram"><FiInstagram /></a>
            <a href="#" aria-label="Twitter"><FiTwitter /></a>
            <a href="#" aria-label="LinkedIn"><FiLinkedin /></a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="footer-col">
          <h4 className="footer-title">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/properties">Properties</Link></li>
            <li><Link to="/invest">Investment</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Services Column */}
        <div className="footer-col">
          <h4 className="footer-title">Our Services</h4>
          <ul className="footer-links">
            <li><a href="#">Property Sales</a></li>
            <li><a href="#">Investment Guidance</a></li>
            <li><a href="#">Legal Assistance</a></li>
            <li><a href="#">Property Valuation</a></li>
            <li><a href="#">Site Visits</a></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div className="footer-col contact-col">
          <h4 className="footer-title">Contact Us</h4>
          <ul className="footer-contact-info">
            <li>
              <FiMapPin className="contact-icon" />
              <span>123 Elite Realty Avenue, Business Park, CA 90210</span>
            </li>
            <li>
              <FiPhone className="contact-icon" />
              <span>+91 98660 81506</span>
            </li>
            <li>
              <FiMail className="contact-icon" />
              <span>info@primeestates.com</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Prime Estates. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
