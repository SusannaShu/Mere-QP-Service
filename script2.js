// Creates a constant object to store the carbon emission factors for transportation, meat consumption, and electricity.
const footprintData = {
    transport: 0.21, // kg CO2 per km
    meat: 2.5, // kg CO2 per serving
    electricity: 0.5 // kg CO2 per kWh
};

document.getElementById('backButton').addEventListener('click', () => {
    window.location.href = "index.html";
});

document.getElementById('calculate-btn').addEventListener('click', () => {
    // Get user input
    const transport = parseFloat(document.getElementById('transport').value) || 0;
    const meat = parseFloat(document.getElementById('meat').value) || 0;
    const electricity = parseFloat(document.getElementById('electricity').value) || 0;

    // Calculate footprint
    const transportFootprint = transport * footprintData.transport * 30; // monthly
    const meatFootprint = meat * footprintData.meat;
    const electricityFootprint = electricity * footprintData.electricity;

    const totalFootprint = transportFootprint + meatFootprint + electricityFootprint;

    // Display result
    document.getElementById('result').innerText = `Your Monthly Carbon Footprint: ${totalFootprint.toFixed(2)} kg CO2`;
});
