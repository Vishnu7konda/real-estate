import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiMapPin } from 'react-icons/fi';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    location: '',
    propertyType: '',
    budget: '',
  });

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
              <select 
                name="propertyType" 
                value={searchParams.propertyType}
                onChange={handleChange}
                className="search-input"
              >
                <option value="">Property Type</option>
                <option value="Plot">Plot</option>
                <option value="Villa">Villa</option>
                <option value="Apartment">Apartment</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>

            <div className="search-input-group border-left">
              <select 
                name="budget" 
                value={searchParams.budget}
                onChange={handleChange}
                className="search-input"
              >
                <option value="">Budget</option>
                <option value="Under ₹5Cr">Under ₹5Cr</option>
                <option value="₹5Cr - ₹10Cr">₹5Cr - ₹10Cr</option>
                <option value="₹10Cr - ₹20Cr">₹10Cr - ₹20Cr</option>
                <option value="Above ₹20Cr">Above ₹20Cr</option>
              </select>
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
