

const properties = [
  {
    title: 'Modern Infinity Pool Villa',
    description: 'Experience unparalleled luxury in this modern villa featuring a breathtaking infinity pool, smart home automation, and panoramic city views. Situated in a prime gated community.',
    price: '35000000',
    location: 'Banjara Hills, Hyderabad',
    propertyType: 'Villa',
    investmentType: 'High ROI',
    isFeatured: 'true',
    amenities: 'Infinity Pool, Home Theater, Smart Security, 4 Car Parking, Private Garden'
  },
  {
    title: 'Premium Tech Park Commercial Space',
    description: 'A premium 5000 sq ft commercial office space located in the heart of the IT corridor. Features central AC, power backup, and high-speed internet connectivity. Ready to move in.',
    price: '85000000',
    location: 'HITEC City, Hyderabad',
    propertyType: 'Commercial',
    investmentType: 'Rental Income',
    isFeatured: 'false',
    amenities: 'Central AC, 100% Power Backup, Cafeteria, 24/7 Security, High-Speed Elevators'
  }
];

async function seedProperties() {
  for (const property of properties) {
    try {
      const form = new FormData();
      Object.keys(property).forEach(key => {
        form.append(key, property[key]);
      });

      const response = await fetch('http://localhost:5000/api/properties', {
        method: 'POST',
        body: form
      });
      
      if (response.ok) {
        console.log(`Successfully added: ${property.title}`);
      } else {
        const text = await response.text();
        console.error(`Failed to add ${property.title}:`, text);
      }
    } catch (err) {
      console.error(`Error adding ${property.title}:`, err);
    }
  }
}

seedProperties();
