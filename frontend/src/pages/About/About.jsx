import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiAward, FiUsers, FiHome, FiCheckCircle } from 'react-icons/fi';
import SEO from '../../components/seo/SEO';
import '../Properties/Properties.css';

const About = () => {
  const { t } = useTranslation();

  return (
    <>
      <SEO 
        title={t('aboutPage.seoTitle')} 
        description={t('aboutPage.seoDescription')}
      />
      
      <div className="bg-gray">
        {/* Page Header */}
        <div className="page-header">
          <div className="container">
            <h1 className="page-title">{t('aboutPage.pageTitle')}</h1>
            <p className="page-subtitle">{t('aboutPage.pageSubtitle')}</p>
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
              <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>{t('aboutPage.agentName')}</h2>
              <p style={{ fontSize: '1.25rem', color: 'var(--secondary)', fontWeight: '600', marginBottom: '1.5rem' }}>{t('aboutPage.agentRole')}</p>
              
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '2rem' }}>
                <p style={{ marginBottom: '1rem' }}>
                  {t('aboutPage.bioPara1')}
                </p>
                <p>
                  {t('aboutPage.bioPara2')}
                </p>
              </div>
              
              <Link to="/contact" className="btn btn-primary">{t('aboutPage.consultationBtn')}</Link>
            </div>
          </div>

          {/* Stats Section */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '5rem' }}>
            <div style={{ backgroundColor: 'var(--surface)', padding: '2rem', borderRadius: '0.5rem', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <FiAward style={{ fontSize: '3rem', color: 'var(--secondary)', margin: '0 auto 1rem' }} />
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '0.5rem' }}>15+</div>
              <div style={{ color: 'var(--text-secondary)' }}>{t('aboutPage.statYears')}</div>
            </div>
            
            <div style={{ backgroundColor: 'var(--surface)', padding: '2rem', borderRadius: '0.5rem', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <FiHome style={{ fontSize: '3rem', color: 'var(--secondary)', margin: '0 auto 1rem' }} />
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '0.5rem' }}>₹2000Cr+</div>
              <div style={{ color: 'var(--text-secondary)' }}>{t('aboutPage.statSales')}</div>
            </div>
            
            <div style={{ backgroundColor: 'var(--surface)', padding: '2rem', borderRadius: '0.5rem', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <FiUsers style={{ fontSize: '3rem', color: 'var(--secondary)', margin: '0 auto 1rem' }} />
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '0.5rem' }}>500+</div>
              <div style={{ color: 'var(--text-secondary)' }}>{t('aboutPage.statFamilies')}</div>
            </div>
          </div>

          {/* Core Values */}
          <div>
            <h2 style={{ textAlign: 'center', fontSize: '2rem', color: 'var(--primary)', marginBottom: '3rem' }}>{t('aboutPage.valuesTitle')}</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
              <div style={{ backgroundColor: 'var(--surface)', padding: '2rem', borderRadius: '0.5rem', borderLeft: '4px solid var(--secondary)' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--primary)' }}>
                  <FiCheckCircle color="var(--secondary)" /> {t('aboutPage.value1Title')}
                </h3>
                <p style={{ color: 'var(--text-secondary)' }}>{t('aboutPage.value1Desc')}</p>
              </div>
              
              <div style={{ backgroundColor: 'var(--surface)', padding: '2rem', borderRadius: '0.5rem', borderLeft: '4px solid var(--secondary)' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--primary)' }}>
                  <FiCheckCircle color="var(--secondary)" /> {t('aboutPage.value2Title')}
                </h3>
                <p style={{ color: 'var(--text-secondary)' }}>{t('aboutPage.value2Desc')}</p>
              </div>
              
              <div style={{ backgroundColor: 'var(--surface)', padding: '2rem', borderRadius: '0.5rem', borderLeft: '4px solid var(--secondary)' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--primary)' }}>
                  <FiCheckCircle color="var(--secondary)" /> {t('aboutPage.value3Title')}
                </h3>
                <p style={{ color: 'var(--text-secondary)' }}>{t('aboutPage.value3Desc')}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default About;
