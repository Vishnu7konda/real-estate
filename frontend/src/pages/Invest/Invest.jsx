import React from 'react';
import { Link } from 'react-router-dom';
import { FiTrendingUp, FiPieChart, FiBarChart2, FiGlobe } from 'react-icons/fi';
import SEO from '../../components/seo/SEO';
import '../Properties/Properties.css'; // Reuse common page header styling

const InvestPage = () => {
  return (
    <>
      <SEO 
        title="Investment Opportunities & Market Insights" 
        description="Discover high ROI real estate investment opportunities and expertly guided asset management."
      />
      
      <div className="bg-gray">
        {/* Page Header */}
        <div className="page-header">
          <div className="container">
            <h1 className="page-title">Investment Opportunities</h1>
            <p className="page-subtitle">Strategic real estate investments with proven high ROI potential.</p>
          </div>
        </div>

        <div className="container" style={{ paddingBottom: '5rem' }}>
          
          {/* Investment Strategies */}
          <section className="section" style={{ paddingTop: '0' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--primary)' }}>Our Investment Approach</h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
                We identify undervalued markets and high-growth corridors before they reach their peak.
              </p>
            </div>

            <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
              <div style={{ backgroundColor: 'var(--surface)', padding: '2rem', borderRadius: '0.5rem', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
                <FiPieChart style={{ fontSize: '3rem', color: 'var(--secondary)', marginBottom: '1rem' }} />
                <h3 style={{ marginBottom: '1rem' }}>Portfolio Diversification</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Spread risk across residential, commercial, and land investments for stable, long-term returns.</p>
              </div>
              <div style={{ backgroundColor: 'var(--surface)', padding: '2rem', borderRadius: '0.5rem', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
                <FiBarChart2 style={{ fontSize: '3rem', color: 'var(--secondary)', marginBottom: '1rem' }} />
                <h3 style={{ marginBottom: '1rem' }}>High Yield Rentals</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Cash-flowing properties in high-demand tenant markets with robust property management strategies.</p>
              </div>
              <div style={{ backgroundColor: 'var(--surface)', padding: '2rem', borderRadius: '0.5rem', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
                <FiGlobe style={{ fontSize: '3rem', color: 'var(--secondary)', marginBottom: '1rem' }} />
                <h3 style={{ marginBottom: '1rem' }}>Emerging Markets</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Early entry into upcoming infrastructure corridors and transit-oriented developments.</p>
              </div>
            </div>
          </section>

          {/* Featured Investment Areas */}
          <section className="section" style={{ backgroundColor: 'var(--surface)', padding: '4rem 2rem', borderRadius: '1rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--primary)', textAlign: 'center' }}>Top Investment Zones for 2026</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              
              <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ flex: '1', minWidth: '300px' }}>
                  <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Tech Corridor" style={{ borderRadius: '0.5rem', width: '100%', height: '300px', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: '1', minWidth: '300px' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--bg-color)', padding: '0.5rem 1rem', borderRadius: '2rem', color: 'var(--secondary)', fontWeight: '600', marginBottom: '1rem' }}>
                    <FiTrendingUp /> Expected ROI: 12-18%
                  </div>
                  <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>The Silicon Expansion Corridor</h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.8' }}>
                    With three major tech conglomerates setting up massive campuses here over the next 24 months, residential demand is projected to outstrip supply by a factor of 4 to 1. 
                    We are currently securing pre-construction plots and premium apartments in this zone.
                  </p>
                  <Link to="/contact" className="btn btn-outline">Request Info Package</Link>
                </div>
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)' }} />

              <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap-reverse' }}>
                <div style={{ flex: '1', minWidth: '300px' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--bg-color)', padding: '0.5rem 1rem', borderRadius: '2rem', color: 'var(--secondary)', fontWeight: '600', marginBottom: '1rem' }}>
                    <FiTrendingUp /> Expected ROI: 8-12% (High Stability)
                  </div>
                  <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Coastal Luxury Retreats</h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.8' }}>
                    These premium waterfront properties offer excellent capital preservation with consistent short-term rental yields. 
                    Perfect for investors looking for a balance of lifestyle usage and reliable income streams in proven affluent markets.
                  </p>
                  <Link to="/contact" className="btn btn-outline">Request Info Package</Link>
                </div>
                <div style={{ flex: '1', minWidth: '300px' }}>
                  <img src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Coastal Property" style={{ borderRadius: '0.5rem', width: '100%', height: '300px', objectFit: 'cover' }} />
                </div>
              </div>

            </div>
          </section>

          {/* CTA */}
          <section style={{ textAlign: 'center', marginTop: '5rem', padding: '4rem 2rem', backgroundColor: 'var(--primary)', color: 'var(--surface)', borderRadius: '1rem' }}>
            <h2 style={{ fontSize: '2rem', color: 'var(--surface)', marginBottom: '1rem' }}>Ready to build your wealth?</h2>
            <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.8)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
              Schedule a private consultation with our investment advisory team to discuss your portfolio goals.
            </p>
            <Link to="/contact" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              Book an Investment Consultation
            </Link>
          </section>

        </div>
      </div>
    </>
  );
};

export default InvestPage;
