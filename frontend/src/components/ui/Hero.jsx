import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiMapPin } from 'react-icons/fi';
import Dropdown from './Dropdown';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    location: '',
    propertyType: '',
    budget: '50000000', // Default Max 5 Cr
  });

  const propertyTypeOptions = [
    { value: '', label: 'Property Type' },
    { value: 'Plot', label: 'Plot' },
    { value: 'Villa', label: 'Villa' },
    { value: 'Apartment', label: 'Apartment' },
    { value: 'Commercial', label: 'Commercial' }
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
          Find Your Perfect <span>Property Investment</span>
        </h1>
        <p className="hero-subtitle">
          Trusted real estate guidance for plots, villas, and premium properties.
        </p>

        <div className="hero-actions">
          <button className="btn btn-primary" onClick={() => navigate('/properties')}>
            View Properties
          </button>
          <button className="btn btn-outline light" onClick={() => navigate('/contact')}>
            Book Site Visit
          </button>
        </div>

        <div className="hero-search-container">
          <form className="hero-search-form" onSubmit={handleSearch}>
            <div className="search-input-group">
              <FiMapPin className="search-icon" />
              <input
                type="text"
                name="location"
                placeholder="Search Location..."
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
                placeholder="Property Type"
              />
            </div>

            <div className="search-input-group border-left" style={{ display: 'flex', flexDirection: 'column', padding: '0 1rem', justifyContent: 'center', width: '200px' }}>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem', fontWeight: '500' }}>
                Max Budget: <span style={{ color: 'var(--primary)' }}>{formatBudget(searchParams.budget)}</span>
              </label>
              <input 
                type="range" 
                name="budget" 
                min="1000000" 
                max="50000000" 
                step="1000000"
                value={searchParams.budget}
                onChange={handleChange}
                style={{ width: '100%', cursor: 'ew-resize', accentColor: 'var(--secondary)' }}
              />
            </div>

            <button type="submit" className="search-submit-btn">
              <FiSearch /> Search
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
