async function cleanup() {
  try {
    const res = await fetch('http://localhost:5000/api/properties');
    const properties = await res.json();
    
    const testBugs = properties.filter(p => p.title.toLowerCase().includes('test bug'));
    console.log(`Found ${testBugs.length} "Test Bug" properties to delete.`);
    
    for (const p of testBugs) {
      const delRes = await fetch(`http://localhost:5000/api/properties/${p.id}`, { method: 'DELETE' });
      if (delRes.ok) {
        console.log(`Deleted property ID: ${p.id}`);
      } else {
        const err = await delRes.text();
        console.error(`Failed to delete property ID: ${p.id}`, err);
      }
    }
  } catch (e) {
    console.error(e);
  }
}

cleanup();
