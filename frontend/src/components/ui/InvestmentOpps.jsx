import React from 'react';
import { Link } from 'react-router-dom';
import { FiTrendingUp, FiArrowRight } from 'react-icons/fi';
import './InvestmentOpps.css';

const InvestmentOpps = () => {
  const opportunities = [
    {
      title: 'Emerging Tech Corridors',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      roi: '12-15%',
      description: 'High demand areas driven by new tech parks and corporate relocations.'
    },
    {
      title: 'Upcoming Transit Hubs',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      roi: '15-20%',
      description: 'Properties near upcoming metro lines and major highway expansions.'
    },
    {
      title: 'Luxury Waterfronts',
      image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      roi: '8-10%',
      description: 'Stable, high-value investments with premium rental yields.'
    }
  ];

  return (
    <section className="section invest-section">
      <div className="container">
        <div className="invest-header">
          <div>
            <h2 className="section-title">High ROI Investment Zones</h2>
            <p className="section-subtitle">
              Capitalize on the fastest-growing locations identified by our market experts.
            </p>
          </div>
          <Link to="/invest" className="btn btn-primary desktop-only">
            View All Opportunities <FiArrowRight className="btn-icon" />
          </Link>
        </div>

        <div className="invest-grid">
          {opportunities.map((opp, index) => (
            <div key={index} className="invest-card">
              <img src={opp.image} alt={opp.title} className="invest-image" />
              <div className="invest-content">
                <div className="roi-badge">
                  <FiTrendingUp /> Expected ROI: {opp.roi}
                </div>
                <h3 className="invest-title">{opp.title}</h3>
                <p className="invest-description">{opp.description}</p>
                <Link to="/contact" className="invest-link">
                  Consult an Expert <FiArrowRight />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mobile-only-btn-container" style={{ marginTop: '2rem' }}>
          <Link to="/invest" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            View All Opportunities <FiArrowRight className="btn-icon" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InvestmentOpps;
