import React, { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard';
import { Link } from 'react-router-dom';
import './FeaturedProperties.css';
import axios from 'axios';

const FeaturedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/properties`);
        // Filter featured properties locally (or could add a query param to backend)
        const featured = response.data.filter(p => p.isFeatured).slice(0, 3);
        setProperties(featured);
      } catch (error) {
        console.error('Error fetching featured properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, []);

  return (
    <section className="section featured-section bg-gray">
      <div className="container">
        <div className="section-header">
          <div>
            <h2 className="section-title">Featured Properties</h2>
            <p className="section-subtitle">Discover our hand-picked selection of premium real estate.</p>
          </div>
          <Link to="/properties" className="btn btn-outline desktop-only">
            View All Properties
          </Link>
        </div>

        {loading ? (
          <div className="loading-spinner">Loading properties...</div>
        ) : (
          <div className="properties-grid">
            {properties.map(property => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}

        <div className="mobile-only-btn-container">
          <Link to="/properties" className="btn btn-outline" style={{ width: '100%', marginTop: '2rem' }}>
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
