import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiCheckCircle, FiShield, FiTrendingUp, FiMap, FiAward } from 'react-icons/fi';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
  const { t } = useTranslation();
  
  const featuresData = t('whyChooseUs.features', { returnObjects: true });

  const icons = [
    <FiCheckCircle />,
    <FiShield />,
    <FiAward />,
    <FiTrendingUp />,
    <FiMap />
  ];

  return (
    <section className="section why-choose-us">
      <div className="container">
        <div className="wcu-header">
          <h2 className="section-title">{t('whyChooseUs.title')}</h2>
          <p className="section-subtitle">
            {t('whyChooseUs.subtitle')}
          </p>
        </div>

        <div className="features-grid">
          {featuresData && Array.isArray(featuresData) && featuresData.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{icons[index]}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
