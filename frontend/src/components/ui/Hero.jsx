import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiMapPin } from 'react-icons/fi';
import Dropdown from './Dropdown';
import './Hero.css';

const Hero = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    location: '',
    propertyType: '',
    budget: '50000000', // Default Max 5 Cr
  });

  const propertyTypeOptions = [
    { value: '', label: t('hero.propertyTypePlaceholder') },
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

  const handleSearch = (e) => {
    e.preventDefault();
    const query = new URLSearchParams(searchParams).toString();
    navigate(`/properties?${query}`);
  };

  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <h1 className="hero-title">
          {t('hero.titlePart1')}<span>{t('hero.titlePart2')}</span>
        </h1>
        <p className="hero-subtitle">
          {t('hero.subtitle')}
        </p>

        <div className="hero-actions">
          <button className="btn btn-primary" onClick={() => navigate('/properties')}>
            {t('hero.viewPropertiesBtn')}
          </button>
          <button className="btn btn-outline light" onClick={() => navigate('/contact')}>
            {t('hero.bookVisitBtn')}
          </button>
        </div>

        <div className="hero-search-container">
          <form className="hero-search-form" onSubmit={handleSearch}>
            <div className="search-input-group">
              <FiMapPin className="search-icon" />
              <input
                type="text"
                name="location"
                placeholder={t('hero.searchLocationPlaceholder')}
                value={searchParams.location}
                onChange={handleChange}
                className="search-input"
              />
            </div>
            
            <div className="search-input-group border-left">
              <Dropdown 
                options={propertyTypeOptions}
                value={searchParams.propertyType}
                onChange={(val) => setSearchParams({ ...searchParams, propertyType: val })}
                placeholder={t('hero.propertyTypePlaceholder')}
              />
            </div>

            <div className="search-input-group border-left" style={{ display: 'flex', flexDirection: 'column', padding: '1rem', justifyContent: 'center', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
                  {t('hero.maxBudgetLabel')}
                </label>
                <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '600' }}>
                  {formatBudget(searchParams.budget)}
                </span>
              </div>
              <input 
                type="range" 
                name="budget" 
                min="1000000" 
                max="50000000" 
                step="1000000"
                value={searchParams.budget}
                onChange={handleChange}
                style={{ width: '100%', cursor: 'ew-resize', accentColor: 'var(--secondary)', display: 'block', margin: '0.5rem 0 0.25rem' }}
              />
            </div>

            <button type="submit" className="search-submit-btn">
              <FiSearch /> {t('hero.searchBtn')}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
