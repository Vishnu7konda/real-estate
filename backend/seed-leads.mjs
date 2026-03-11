

const demoLeads = [
  {
    name: 'Rajesh Kumar',
    phone: '+91 9876543210',
    email: 'rajesh.kumar@example.com',
    propertyType: 'Villa',
    budget: '50000000',
    sourcePage: 'Contact Form',
    message: 'I am interested in the Modern Infinity Pool Villa. Is it still available for a site visit this weekend?'
  },
  {
    name: 'Priya Sharma',
    phone: '+91 8765432109',
    email: 'priya.s@example.com',
    propertyType: 'Commercial',
    budget: '85000000',
    sourcePage: 'Property Details',
    message: 'Looking to invest in IT corridor commercial spaces. Have you got any premium layouts with central AC?'
  },
  {
    name: 'Alok Singh',
    phone: '+91 7654321098',
    email: 'alok.singh@example.com',
    propertyType: 'Apartment',
    budget: '20000000',
    sourcePage: 'Home Page',
    message: 'Need a 3BHK apartment near Jubilee Hills.'
  }
];

async function seedLeads() {
  for (const lead of demoLeads) {
    try {
      const response = await fetch('http://localhost:5000/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(lead)
      });
      
      if (response.ok) {
        console.log(`Successfully added lead: ${lead.name}`);
      } else {
        const text = await response.text();
        console.error(`Failed to add lead ${lead.name}:`, text);
      }
    } catch (err) {
      console.error(`Error adding lead ${lead.name}:`, err);
    }
  }
}

seedLeads();
