import React from 'react';
import SEO from '../../components/seo/SEO';
import Hero from '../../components/ui/Hero';
import FeaturedProperties from '../../components/ui/FeaturedProperties';
import WhyChooseUs from '../../components/ui/WhyChooseUs';
import InvestmentOpps from '../../components/ui/InvestmentOpps';

const Home = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Prime Estates",
    "image": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "description": "Trusted real estate guidance for plots, villas, and premium properties.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Elite Realty Avenue",
      "addressLocality": "Business Park",
      "addressRegion": "CA",
      "postalCode": "90210",
      "addressCountry": "US"
    },
    "telephone": "+15551234567"
  };

  return (
    <>
      <SEO 
        title="Find Your Perfect Property Investment" 
        description="Discover luxury villas, premium plots, and high ROI investment opportunities with Prime Estates."
        url="https://primeestates.com"
        schema={schema}
      />
      <Hero />
      <FeaturedProperties />
      <WhyChooseUs />
      <InvestmentOpps />
    </>
  );
};

export default Home;
