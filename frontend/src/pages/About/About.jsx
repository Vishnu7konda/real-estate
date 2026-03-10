import React from 'react';
import { Link } from 'react-router-dom';
import { FiAward, FiUsers, FiHome, FiCheckCircle } from 'react-icons/fi';
import SEO from '../../components/seo/SEO';
import '../Properties/Properties.css';

const About = () => {
  return (
    <>
      <SEO 
        title="About the Agent" 
        description="Meet your trusted real estate advisor with over 15 years of experience in luxury and investment properties."
      />
      
      <div className="bg-gray">
        {/* Page Header */}
        <div className="page-header">
          <div className="container">
            <h1 className="page-title">About Prime Estates</h1>
            <p className="page-subtitle">Your trusted partner in navigating the premium real estate market.</p>
          </div>
        </div>

        <div className="container" style={{ paddingBottom: '6rem' }}>
          
          {/* Agent Profile Section */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center', marginBottom: '5rem' }}>
            <div style={{ borderRadius: '1rem', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Professional Real Estate Agent" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
            
            <div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Jonathan Carter</h2>
              <p style={{ fontSize: '1.25rem', color: 'var(--secondary)', fontWeight: '600', marginBottom: '1.5rem' }}>Founder & Lead Investment Advisor</p>
              
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '2rem' }}>
                <p style={{ marginBottom: '1rem' }}>
                  With over 15 years of dedicated experience in the premium real estate market, I have built Prime Estates on the foundation of uncompromised integrity, deep market knowledge, and an unwavering commitment to my clients' success.
                </p>
                <p>
                  My approach is fundamentally different from traditional agents. I operate as a strategic investment advisor, focusing on data-driven property acquisitions that offer both exceptional lifestyle value and strong long-term yields. Whether you are looking for a forever home or expanding your investment portfolio, my team and I provide end-to-end, white-glove service.
                </p>
              </div>
              
              <Link to="/contact" className="btn btn-primary">Schedule a Consultation</Link>
            </div>
          </div>

          {/* Stats Section */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '5rem' }}>
            <div style={{ backgroundColor: 'var(--surface)', padding: '2rem', borderRadius: '0.5rem', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <FiAward style={{ fontSize: '3rem', color: 'var(--secondary)', margin: '0 auto 1rem' }} />
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '0.5rem' }}>15+</div>
              <div style={{ color: 'var(--text-secondary)' }}>Years Experience</div>
            </div>
            
            <div style={{ backgroundColor: 'var(--surface)', padding: '2rem', borderRadius: '0.5rem', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <FiHome style={{ fontSize: '3rem', color: 'var(--secondary)', margin: '0 auto 1rem' }} />
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '0.5rem' }}>₹2000Cr+</div>
              <div style={{ color: 'var(--text-secondary)' }}>in Career Sales</div>
            </div>
            
            <div style={{ backgroundColor: 'var(--surface)', padding: '2rem', borderRadius: '0.5rem', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <FiUsers style={{ fontSize: '3rem', color: 'var(--secondary)', margin: '0 auto 1rem' }} />
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '0.5rem' }}>500+</div>
              <div style={{ color: 'var(--text-secondary)' }}>Happy Families</div>
            </div>
          </div>

          {/* Core Values */}
          <div>
            <h2 style={{ textAlign: 'center', fontSize: '2rem', color: 'var(--primary)', marginBottom: '3rem' }}>Our Core Values</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
              <div style={{ backgroundColor: 'var(--surface)', padding: '2rem', borderRadius: '0.5rem', borderLeft: '4px solid var(--secondary)' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--primary)' }}>
                  <FiCheckCircle color="var(--secondary)" /> Radical Transparency
                </h3>
                <p style={{ color: 'var(--text-secondary)' }}>We provide completely honest assessments of every property, including potential drawbacks, ensuring you always make informed decisions.</p>
              </div>
              
              <div style={{ backgroundColor: 'var(--surface)', padding: '2rem', borderRadius: '0.5rem', borderLeft: '4px solid var(--secondary)' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--primary)' }}>
                  <FiCheckCircle color="var(--secondary)" /> Client-First Approach
                </h3>
                <p style={{ color: 'var(--text-secondary)' }}>Your long-term financial success and peace of mind are always prioritized over a quick commission. We build generational relationships.</p>
              </div>
              
              <div style={{ backgroundColor: 'var(--surface)', padding: '2rem', borderRadius: '0.5rem', borderLeft: '4px solid var(--secondary)' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--primary)' }}>
                  <FiCheckCircle color="var(--secondary)" /> Market Mastery
                </h3>
                <p style={{ color: 'var(--text-secondary)' }}>We constantly analyze macro and micro economic data to identify emerging trends before they become mainstream knowledge.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default About;
