async function getProps() {
  try {
    const res = await fetch('http://localhost:5000/api/properties');
    const json = await res.json();
    console.log(JSON.stringify(json[0], null, 2));
  } catch (err) {
    console.error(err);
  }
}
getProps();
