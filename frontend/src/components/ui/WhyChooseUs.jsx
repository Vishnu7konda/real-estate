import React from 'react';
import { FiCheckCircle, FiShield, FiTrendingUp, FiMap, FiAward } from 'react-icons/fi';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FiCheckCircle />,
      title: 'Verified Properties',
      description: 'Every property undergoes a strict 50-point legal and structural verification process before listing.'
    },
    {
      icon: <FiShield />,
      title: 'Transparent Pricing',
      description: 'No hidden fees. We believe in complete transparency throughout the entire transaction process.'
    },
    {
      icon: <FiAward />,
      title: 'Legal Assistance',
      description: 'Our in-house legal team ensures all documentation, registrations, and titles are crystal clear.'
    },
    {
      icon: <FiTrendingUp />,
      title: 'Investment Guidance',
      description: 'Data-driven insights to help you choose properties with the highest potential ROI and market growth.'
    },
    {
      icon: <FiMap />,
      title: 'End-to-End Support',
      description: 'From initial property visits to handing over the keys, we manage the entire lifecycle for you.'
    }
  ];

  return (
    <section className="section why-choose-us">
      <div className="container">
        <div className="wcu-header">
          <h2 className="section-title">Why Choose Prime Estates</h2>
          <p className="section-subtitle">
            We don't just sell properties; we build long-term relationships based on trust, transparency, and results.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
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
