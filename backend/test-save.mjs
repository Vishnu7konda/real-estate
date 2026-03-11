async function testCreateProperty() {
  try {
    const form = new FormData();
    form.append('title', 'Test Property');
    form.append('description', 'Test Description');
    form.append('price', '15000000');
    form.append('location', 'Test Location');
    form.append('propertyType', 'Villa');
    form.append('investmentType', 'High ROI');
    form.append('isFeatured', 'false');

    const response = await fetch('http://localhost:5000/api/properties', {
      method: 'POST',
      body: form
    });
    
    const text = await response.text();
    console.log('Status:', response.status);
    console.log('Response:', text);
  } catch (err) {
    console.error('Error:', err);
  }
}

testCreateProperty();
