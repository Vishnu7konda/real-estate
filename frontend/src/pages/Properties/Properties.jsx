import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '../../components/seo/SEO';
import PropertyCard from '../../components/ui/PropertyCard';
import Dropdown from '../../components/ui/Dropdown';
import { FiFilter } from 'react-icons/fi';
import axios from 'axios';
import './Properties.css';

const Properties = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: searchParams.get('location') || '',
    propertyType: searchParams.get('propertyType') || '',
    budget: searchParams.get('budget') || '50000000',
    sort: 'newest'
  });

  const propertyTypeOptions = [
    { value: '', label: t('propertiesPage.propertyTypePlaceholder') },
    { value: 'Plot', label: t('hero.propertyTypePlot') },
    { value: 'Villa', label: t('hero.propertyTypeVilla') },
    { value: 'Apartment', label: t('hero.propertyTypeApartment') },
    { value: 'Commercial', label: t('hero.propertyTypeCommercial') }
  ];

  const sortOptions = [
    { value: 'newest', label: t('propertiesPage.sortNewest') },
    { value: 'price-low', label: t('propertiesPage.sortPriceLow') },
    { value: 'price-high', label: t('propertiesPage.sortPriceHigh') }
  ];

  const formatBudget = (value) => {
    const num = Number(value);
    if (num >= 10000000) return `₹${+(num / 10000000).toFixed(2)} Cr`;
    if (num >= 100000) return `₹${+(num / 100000).toFixed(2)} L`;
    return `₹${num.toLocaleString('en-IN')}`;
  };

  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/properties`);
        
        // Apply frontend filtering on the live data
        let filtered = response.data;
        if (filters.propertyType) {
          filtered = filtered.filter(p => p.propertyType === filters.propertyType);
        }
        if (filters.location) {
          filtered = filtered.filter(p => p.location.toLowerCase().includes(filters.location.toLowerCase()));
        }
        if (filters.budget) {
          filtered = filtered.filter(p => p.price <= Number(filters.budget));
        }
        
        // Sorting
        if (filters.sort === 'newest') {
          filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (filters.sort === 'price-low') {
          filtered.sort((a, b) => a.price - b.price);
        } else if (filters.sort === 'price-high') {
          filtered.sort((a, b) => b.price - a.price);
        }

        setProperties(filtered);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <>
      <SEO 
        title={t('propertiesPage.seoTitle')} 
        description={t('propertiesPage.seoDescription')}
      />
      
      <div className="properties-page bg-gray">
        {/* Page Header */}
        <div className="page-header">
          <div className="container">
            <h1 className="page-title">{t('propertiesPage.pageTitle')}</h1>
            <p className="page-subtitle">{t('propertiesPage.pageSubtitle')}</p>
          </div>
        </div>

        <div className="container properties-container">
          {/* Sidebar Filters */}
          <aside className={`filters-sidebar ${showFilters ? 'show' : ''}`}>
            <div className="filters-header">
              <h3>{t('propertiesPage.searchFilters')}</h3>
              <button 
                className="close-filters desktop-hide"
                onClick={() => setShowFilters(false)}
              >
                &times;
              </button>
            </div>
            
            <div className="filter-group">
              <label className="input-label">{t('propertiesPage.locationLabel')}</label>
              <input 
                type="text" 
                name="location" 
                className="input-field" 
                placeholder={t('propertiesPage.locationPlaceholder')} 
                value={filters.location}
                onChange={handleFilterChange}
              />
            </div>
            
            <div className="filter-group">
              <label className="input-label">{t('propertiesPage.propertyTypeLabel')}</label>
              <Dropdown 
                options={propertyTypeOptions}
                value={filters.propertyType}
                onChange={(val) => setFilters({ ...filters, propertyType: val })}
                placeholder={t('propertiesPage.propertyTypePlaceholder')}
              />
            </div>
            
            <div className="filter-group">
              <label className="input-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {t('propertiesPage.maxBudgetLabel')}
                <span style={{ color: 'var(--primary)', fontWeight: '600' }}>{formatBudget(filters.budget)}</span>
              </label>
              <input 
                type="range" 
                name="budget" 
                min="1000000" 
                max="50000000" 
                step="1000000"
                className="input-field"
                style={{ padding: '0', cursor: 'ew-resize', accentColor: 'var(--secondary)', border: 'none' }}
                value={filters.budget}
                onChange={handleFilterChange}
              />
            </div>

            <button className="btn btn-primary" style={{ width: '100%' }}>
              {t('propertiesPage.applyFiltersBtn')}
            </button>
          </aside>

          {/* Main Content Area */}
          <main className="properties-main">
            <div className="properties-toolbar">
              <p className="results-count">{t('propertiesPage.showingResultsLeft')}<strong>{properties.length}</strong>{t('propertiesPage.showingResultsRight')}</p>
              
              <div className="toolbar-actions">
                <button 
                  className="btn btn-outline filters-toggle desktop-hide"
                  onClick={() => setShowFilters(true)}
                >
                  <FiFilter /> {t('propertiesPage.filtersBtnMobile')}
                </button>
                
                <Dropdown 
                  options={sortOptions}
                  value={filters.sort}
                  onChange={(val) => setFilters({ ...filters, sort: val })}
                  className="sort-select"
                />
              </div>
            </div>

            {loading ? (
              <div className="loading-spinner">{t('propertiesPage.loading')}</div>
            ) : properties.length > 0 ? (
              <div className="properties-grid main-grid">
                {properties.map(property => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>
            ) : (
              <div className="no-results">
                <h3>{t('propertiesPage.noResultsTitle')}</h3>
                <p>{t('propertiesPage.noResultsText')}</p>
                <button 
                  className="btn btn-outline" 
                  style={{ marginTop: '1rem' }}
                  onClick={() => setFilters({ location: '', propertyType: '', budget: '', sort: 'newest' })}
                >
                  {t('propertiesPage.clearFiltersBtn')}
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default Properties;
