async function getLeads() {
  try {
    const res = await fetch('http://localhost:5000/api/leads');
    const json = await res.json();
    console.log('Total leads:', json.length);
    console.log(JSON.stringify(json, null, 2));
  } catch (err) {
    console.error(err);
  }
}
getLeads();
