import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiMenu, FiX, FiGlobe } from 'react-icons/fi';
import Dropdown from '../../components/ui/Dropdown';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const navLinks = [
    { name: t('navbar.home'), path: '/' },
    { name: t('navbar.properties'), path: '/properties' },
    { name: t('navbar.investment'), path: '/invest' },
    { name: t('navbar.about'), path: '/about' },
    { name: t('navbar.contact'), path: '/contact' },
  ];

  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          Prime<span>Estates</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="navbar-nav desktop-nav">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.name} className="nav-item">
                <Link
                  to={link.path}
                  className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="navbar-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          
          <div className="language-selector" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-color)', zIndex: 1000 }}>
            <FiGlobe size={18} />
            <div style={{ width: '130px' }}>
              <Dropdown 
                options={[
                  { value: 'en', label: 'English' },
                  { value: 'te', label: 'తెలుగు' },
                  { value: 'hi', label: 'हिन्दी' }
                ]}
                value={i18n.language || 'en'}
                onChange={(val) => changeLanguage(val)}
              />
            </div>
          </div>

          <Link to="/contact" className="btn btn-primary cta-btn">
            {t('navbar.bookVisit')}
          </Link>
          <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-nav ${isOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-list">
          {navLinks.map((link) => (
            <li key={link.name} className="mobile-nav-item">
              <Link
                to={link.path}
                className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li className="mobile-nav-item">
             <Link to="/contact" className="btn btn-primary" style={{ width: '100%' }} onClick={closeMenu}>
               {t('navbar.bookVisit')}
             </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
