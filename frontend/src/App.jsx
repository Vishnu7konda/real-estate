import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home/Home';
import Properties from './pages/Properties/Properties';
import PropertyDetails from './pages/PropertyDetails/PropertyDetails';
import Invest from './pages/Invest/Invest';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import AgentDashboard from './pages/Agent/AgentDashboard';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:id" element={<PropertyDetails />} />
          <Route path="/invest" element={<Invest />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/dashboard" element={<AgentDashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
