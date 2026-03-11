import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FiTrendingUp, FiArrowRight } from 'react-icons/fi';
import './InvestmentOpps.css';

const InvestmentOpps = () => {
  const { t } = useTranslation();
  
  const oppsData = t('investmentOpps.opportunities', { returnObjects: true });

  const images = [
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  ];

  return (
    <section className="section invest-section">
      <div className="container">
        <div className="invest-header">
          <div>
            <h2 className="section-title">{t('investmentOpps.title')}</h2>
            <p className="section-subtitle">
              {t('investmentOpps.subtitle')}
            </p>
          </div>
          <Link to="/invest" className="btn btn-primary desktop-only">
            {t('investmentOpps.viewAllBtn')} <FiArrowRight className="btn-icon" />
          </Link>
        </div>

        <div className="invest-grid">
          {oppsData && Array.isArray(oppsData) && oppsData.map((opp, index) => (
            <div key={index} className="invest-card">
              <img src={images[index]} alt={opp.title} className="invest-image" />
              <div className="invest-content">
                <div className="roi-badge">
                  <FiTrendingUp /> {t('investmentOpps.expectedRoi')} {opp.roi}
                </div>
                <h3 className="invest-title">{opp.title}</h3>
                <p className="invest-description">{opp.description}</p>
                <Link to="/contact" className="invest-link">
                  {t('investmentOpps.consultBtn')} <FiArrowRight />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mobile-only-btn-container" style={{ marginTop: '2rem' }}>
          <Link to="/invest" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            {t('investmentOpps.viewAllBtn')} <FiArrowRight className="btn-icon" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InvestmentOpps;
