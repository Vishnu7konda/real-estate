import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FiUsers, FiHome, FiTrendingUp, FiLogOut, FiEdit2, FiTrash2, FiEye, FiEyeOff, FiGlobe, FiX, FiPlus } from 'react-icons/fi';
import Dropdown from '../../components/ui/Dropdown';
import SEO from '../../components/seo/SEO';
import '../Properties/Properties.css';
import './AgentDashboard.css';

const AgentDashboard = () => {
  const { t, i18n } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(() => sessionStorage.getItem('adminAuth') === 'true');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('leads');
  const [leads, setLeads] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [propLoading, setPropLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showAddProp, setShowAddProp] = useState(false);
  const [newProp, setNewProp] = useState({
    title: '', description: '', price: '', location: '', propertyType: 'Villa', investmentType: 'High ROI', images: '', amenities: '', mapLocation: '', isFeatured: false, imageFiles: []
  });
  const [propToDelete, setPropToDelete] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      sessionStorage.setItem('adminAuth', 'true');
      fetchLeads();
      fetchProperties();
    } else {
      sessionStorage.removeItem('adminAuth');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const leadStatusOptions = [
    { value: 'New', label: 'New' },
    { value: 'Contacted', label: 'Contacted' },
    { value: 'Follow Up', label: 'Follow Up' },
    { value: 'Qualified', label: 'Qualified' },
    { value: 'Converted', label: 'Converted' },
    { value: 'Lost', label: 'Lost' }
  ];

  const propertyTypeOptions = [
    { value: 'Villa', label: 'Villa' },
    { value: 'Apartment', label: 'Apartment' },
    { value: 'Commercial', label: 'Commercial' },
    { value: 'Plot', label: 'Plot' }
  ];

  const investmentTypeOptions = [
    { value: 'High ROI', label: 'High ROI' },
    { value: 'Long Term', label: 'Long Term' },
    { value: 'Rental Income', label: 'Rental Income' }
  ];

  const formatPrice = (value) => {
    if (!value) return '';
    const num = Number(value);
    if (isNaN(num)) return '';
    if (num >= 10000000) return `₹${+(num / 10000000).toFixed(2)} Cr`;
    if (num >= 100000) return `₹${+(num / 100000).toFixed(2)} L`;
    return `₹${num.toLocaleString('en-IN')}`;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setIsLoading(true); // Start loading
    if (password === 'vishnu@konda') { // Hardcoded for demo
      setTimeout(() => {
        setIsAuthenticated(true);
        setIsLoading(false); // End loading
      }, 1000); // Simulate network delay
    } else {
      setIsLoading(false); // End loading
      setError(t('adminLogin.invalidPassword'));
    }
  };

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/leads`);
      if (response.ok) {
        const data = await response.json();
        setLeads(data);
      } else {
        // Fallback to mock data if backend not running
        setMockLeads();
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
      setMockLeads();
    }
    setLoading(false);
  };

  const fetchProperties = async () => {
    setPropLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/properties`);
      if (response.ok) {
        const data = await response.json();
        setProperties(data);
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
    setPropLoading(false);
  };

  const requestDeleteProperty = (id) => {
    setPropToDelete(id);
  };

  const confirmDeleteProperty = async () => {
    if (!propToDelete) return;
    const id = propToDelete;
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/properties/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setProperties(properties.filter(p => (p.id || p._id) !== id));
      } else {
        const errText = await response.text();
        alert('Error deleting property: ' + errText);
      }
    } catch (error) {
      console.error('Error deleting property:', error);
      alert('Network/Server error deleting property: ' + error.message);
    }
    setPropToDelete(null);
  };

  const cancelDeleteProperty = () => {
    setPropToDelete(null);
  };

  const handleAddProperty = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', newProp.title);
      formData.append('description', newProp.description);
      formData.append('price', Number(newProp.price));
      formData.append('location', newProp.location);
      formData.append('propertyType', newProp.propertyType);
      formData.append('investmentType', newProp.investmentType);
      formData.append('isFeatured', newProp.isFeatured);
      
      if (newProp.amenities) formData.append('amenities', newProp.amenities);
      if (newProp.images) formData.append('imageUrls', newProp.images);
      
      if (newProp.imageFiles && newProp.imageFiles.length > 0) {
        for (let i = 0; i < newProp.imageFiles.length; i++) {
          formData.append('images', newProp.imageFiles[i]);
        }
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/properties`, {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        const added = await response.json();
        setProperties([...properties, added]);
        setShowAddProp(false);
        setNewProp({ title: '', description: '', price: '', location: '', propertyType: 'Villa', investmentType: 'High ROI', images: '', amenities: '', mapLocation: '', isFeatured: false, imageFiles: [] });
      } else {
        const errorText = await response.text();
        alert('Error adding property: ' + errorText);
        console.error('Server response:', errorText);
      }
    } catch (error) {
      console.error('Error adding property:', error);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const currentFiles = Array.isArray(newProp.imageFiles) ? newProp.imageFiles : [];
    
    // Filter out if total exceeds 7
    const remainingSlots = 7 - currentFiles.length;
    const allowedFiles = files.slice(0, remainingSlots);
    
    if (files.length > remainingSlots) {
      alert("You can only upload up to exactly 7 images per property.");
    }

    setNewProp({
      ...newProp,
      imageFiles: [...currentFiles, ...allowedFiles]
    });
    
    e.target.value = ''; // Reset input to allow re-uploading same file if deleted
  };

  const removeImage = (index) => {
    const currentFiles = Array.isArray(newProp.imageFiles) ? [...newProp.imageFiles] : [];
    currentFiles.splice(index, 1);
    setNewProp({ ...newProp, imageFiles: currentFiles });
  };

  const setMockLeads = () => {
    setLeads([
      { _id: '1', name: 'John Doe', phone: '555-0101', email: 'john@example.com', propertyType: 'Villa', budget: '₹10Cr - ₹20Cr', status: 'New', createdAt: new Date().toISOString() },
      { _id: '2', name: 'Sarah Smith', phone: '555-0202', email: 'sarah@example.com', propertyType: 'Any', budget: 'Above ₹20Cr', status: 'Follow Up', createdAt: new Date(Date.now() - 86400000).toISOString() },
      { _id: '3', name: 'Mike Johnson', phone: '555-0303', email: 'mike@example.com', propertyType: 'Plot', budget: 'Under ₹5Cr', status: 'Converted', createdAt: new Date(Date.now() - 172800000).toISOString() },
    ]);
  };

  const updateLeadStatus = async (id, newStatus) => {
    // Optimistic UI update
    setLeads(leads.map(lead => (lead.id || lead._id) === id ? { ...lead, status: newStatus } : lead));
    
    try {
      await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/leads/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (error) {
      console.error('Error updating lead:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper">
        <SEO title={t('adminLogin.title')} />
        <div className="admin-login-card">
          <h1 style={{ color: 'var(--primary)', marginBottom: '1rem', fontSize: '2rem' }}>{t('adminLogin.title')}</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>{t('adminLogin.subtitle')}</p>
          
          <form onSubmit={handleLogin}>
            {error && (
              <div style={{ backgroundColor: '#FEE2E2', color: '#991B1B', padding: '0.75rem', borderRadius: '0.375rem', marginBottom: '1rem', fontSize: '0.875rem' }}>
                {error}
              </div>
            )}
            <div className="input-group" style={{ position: 'relative' }}>
              <input 
                type={showPassword ? "text" : "password"} 
                className="input-field" 
                placeholder={t('adminLogin.passwordPlaceholder')} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                style={{ borderColor: error ? '#EF4444' : 'var(--border-color)', paddingRight: '2.5rem' }}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              {isLoading ? t('adminLogin.verifyingButton') : t('adminLogin.loginButton')}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray" style={{ minHeight: 'calc(100vh - 80px)', backgroundColor: '#f1f5f9' }}>
      <SEO title="Agent CRM Dashboard" />
      
      {/* Top Navbar for CRM */}
      <div className="admin-header">
        <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Prime Estates CRM</h2>
        <div className="admin-header-actions">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', zIndex: 1000 }}>
            <FiGlobe size={18} />
            <div style={{ width: '130px', color: '#1E293B' }}>
              <Dropdown 
                options={[
                  { value: 'en', label: 'English' },
                  { value: 'te', label: 'తెలుగు' },
                  { value: 'hi', label: 'हिन्दी' }
                ]}
                value={i18n.language || 'en'}
                onChange={(val) => i18n.changeLanguage(val)}
              />
            </div>
          </div>
          <button 
            onClick={() => setIsAuthenticated(false)} 
            style={{ background: 'none', border: 'none', color: 'var(--surface)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem' }}
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </div>

      {/* Custom Delete Confirmation Modal */}
      {propToDelete && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ backgroundColor: 'var(--surface)', padding: '2rem', borderRadius: '0.75rem', width: '90%', maxWidth: '400px', boxShadow: 'var(--shadow-lg)' }}>
            <h3 style={{ color: 'var(--primary)', marginBottom: '1rem', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FiTrash2 color="#EF4444" /> Delete Property
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
              Are you sure you want to delete this property? This action cannot be undone and it will be permanently removed from your active listings.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button 
                onClick={cancelDeleteProperty}
                style={{ padding: '0.5rem 1rem', borderRadius: '0.375rem', border: '1px solid var(--border-color)', backgroundColor: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: '500' }}
              >
                No, Cancel
              </button>
              <button 
                onClick={confirmDeleteProperty}
                style={{ padding: '0.5rem 1rem', borderRadius: '0.375rem', border: 'none', backgroundColor: '#EF4444', color: 'white', cursor: 'pointer', fontWeight: '500' }}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container admin-layout">
        
        {/* Sidebar */}
        <div className="admin-sidebar">
          <ul>
            <li>
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`admin-tab-btn ${activeTab === 'dashboard' ? 'active' : 'inactive'}`}
              >
                <FiTrendingUp /> Overview
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('leads')}
                className={`admin-tab-btn ${activeTab === 'leads' ? 'active' : 'inactive'}`}
              >
                <FiUsers /> Manage Leads
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('properties')}
                className={`admin-tab-btn ${activeTab === 'properties' ? 'active' : 'inactive'}`}
              >
                <FiHome /> Properties
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="admin-main">
          
          {activeTab === 'dashboard' && (
            <div>
              <div className="admin-section-header">
                <h3>Dashboard Overview</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)' }}>Welcome back. Here is a quick snapshot of your CRM.</p>
              
              <div className="dashboard-stats-grid">
                <div style={{ padding: '1.5rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem', borderLeft: '4px solid var(--secondary)' }}>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Total Leads</div>
                  <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary)' }}>{leads.length}</div>
                </div>
                <div style={{ padding: '1.5rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem', borderLeft: '4px solid #10B981' }}>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>New Inquiries</div>
                  <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary)' }}>{leads.filter(l => l.status === 'New').length}</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'leads' && (
            <div>
              <div className="admin-section-header">
                <h3>Lead Management</h3>
                <button className="btn btn-outline" onClick={fetchLeads}>Refresh</button>
              </div>

              {loading ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>Loading leads...</div>
              ) : (
                <div className="admin-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Interest</th>
                        <th>Budget</th>
                        <th>Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.map(lead => (
                        <tr key={lead.id || lead._id}>
                          <td data-label="Name" style={{ fontWeight: '500' }}>{lead.name}</td>
                          <td data-label="Contact">
                            <div style={{ fontSize: '0.875rem', color: 'var(--primary)' }}>{lead.phone}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{lead.email}</div>
                          </td>
                          <td data-label="Interest" style={{ fontSize: '0.875rem' }}>{lead.propertyType}</td>
                          <td data-label="Budget" style={{ fontSize: '0.875rem' }}>{lead.budget}</td>
                          <td data-label="Date" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                            {new Date(lead.createdAt).toLocaleDateString()}
                          </td>
                          <td data-label="Status">
                            <div style={{ width: '130px' }}>
                              <Dropdown 
                                options={leadStatusOptions}
                                value={lead.status}
                                onChange={(val) => updateLeadStatus(lead.id || lead._id, val)}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                      {leads.length === 0 && (
                        <tr>
                          <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>No leads found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'properties' && (
            <div>
              <div className="admin-section-header">
                <h3>Property Management</h3>
                <button className="btn btn-primary" onClick={() => setShowAddProp(!showAddProp)}>
                  {showAddProp ? 'Cancel' : '+ Add Property'}
                </button>
              </div>

              {showAddProp && (
                <div style={{ padding: '2rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem', marginBottom: '2rem' }}>
                  <h4 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Add New Property</h4>
                  <form onSubmit={handleAddProperty} style={{ display: 'grid', gap: '1rem' }}>
                    <div className="prop-form-grid-2">
                      <input type="text" placeholder="Title" required className="input-field" value={newProp.title} onChange={e => setNewProp({...newProp, title: e.target.value})} />
                      <div>
                        <input type="number" placeholder="Price Contextual (INR)" required className="input-field" value={newProp.price} onChange={e => setNewProp({...newProp, price: e.target.value})} />
                        {newProp.price && <div style={{ fontSize: '0.75rem', color: 'var(--secondary)', marginTop: '0.25rem', fontWeight: '600' }}>Formatted: {formatPrice(newProp.price)}</div>}
                      </div>
                    </div>
                    <input type="text" placeholder="Location" required className="input-field" value={newProp.location} onChange={e => setNewProp({...newProp, location: e.target.value})} />
                    <div className="prop-form-grid-3">
                      <Dropdown 
                        options={propertyTypeOptions}
                        value={newProp.propertyType}
                        onChange={(val) => setNewProp({...newProp, propertyType: val})}
                      />
                      <Dropdown 
                        options={investmentTypeOptions}
                        value={newProp.investmentType}
                        onChange={(val) => setNewProp({...newProp, investmentType: val})}
                      />
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input type="checkbox" checked={newProp.isFeatured} onChange={e => setNewProp({...newProp, isFeatured: e.target.checked})} /> Featured
                      </label>
                    </div>
                    <textarea placeholder="Description" required className="input-field" rows="3" value={newProp.description} onChange={e => setNewProp({...newProp, description: e.target.value})}></textarea>
                    
                    <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                      <label style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--primary)', fontWeight: '600'}}>
                        <span>Property Image Slots (Max 7)</span>
                        <span style={{ fontSize: '0.75rem', color: newProp.imageFiles.length >= 7 ? 'var(--error)' : 'var(--text-secondary)' }}>{newProp.imageFiles.length} / 7 Uploaded</span>
                      </label>
                      <div className="image-upload-grid">
                        {[...Array(7)].map((_, index) => {
                          const file = newProp.imageFiles[index];
                          const previewUrl = file ? URL.createObjectURL(file) : null;
                          
                          return (
                            <div key={index} className="image-upload-slot" onClick={() => !file && document.getElementById('property-image-upload').click()}>
                              {file ? (
                                <>
                                  <img src={previewUrl} alt={`Upload ${index + 1}`} />
                                  <button type="button" className="image-remove-btn" onClick={(e) => { e.stopPropagation(); removeImage(index); }}>
                                    <FiX size={14} />
                                  </button>
                                </>
                              ) : (
                                <>
                                  <FiPlus size={24} color="var(--text-secondary)" />
                                  <div className="image-upload-placeholder">Slot {index + 1}</div>
                                </>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <input 
                        id="property-image-upload"
                        type="file" 
                        multiple 
                        accept="image/*" 
                        onChange={handleImageChange} 
                        style={{ display: 'none' }} 
                        disabled={newProp.imageFiles.length >= 7}
                      />
                    </div>
                    
                    <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                      <label style={{display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--text-secondary)'}}>Or Provide External Image URLs (Fallback)</label>
                      <input type="text" placeholder="Image URLs (comma separated)" className="input-field" value={newProp.images} onChange={e => setNewProp({...newProp, images: e.target.value})} />
                    </div>
                    
                    <input type="text" placeholder="Amenities (comma separated)" className="input-field" value={newProp.amenities} onChange={e => setNewProp({...newProp, amenities: e.target.value})} />
                    <button type="submit" className="btn btn-primary" style={{ width: 'fit-content', marginTop: '1rem' }}>Save Property</button>
                  </form>
                </div>
              )}

              {propLoading ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>Loading properties...</div>
              ) : (
                <div className="admin-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Property</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {properties.map(prop => (
                        <tr key={prop.id || prop._id}>
                          <td data-label="Property" style={{ fontWeight: '500' }}>
                            <div>{prop.title}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{prop.location}</div>
                          </td>
                          <td data-label="Type" style={{ fontSize: '0.875rem' }}>{prop.propertyType}</td>
                          <td data-label="Price" style={{ fontSize: '0.875rem', fontWeight: '600' }}>{formatPrice(prop.price)}</td>
                          <td data-label="Actions">
                            <button onClick={() => requestDeleteProperty(prop.id || prop._id)} style={{ padding: '0.35rem 0.75rem', borderRadius: '0.25rem', border: 'none', backgroundColor: '#FEE2E2', color: '#991B1B', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.25rem', width: 'fit-content' }}>
                              <FiTrash2 /> Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                      {properties.length === 0 && (
                        <tr>
                          <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>No properties added yet.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
