const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());

// Read the JSON data from 'data.json'
const locations = JSON.parse(fs.readFileSync(path.join(__dirname, 'vehicleData.json')));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Simulate vehicle movement by cycling through the locations
let currentIndex = 0;

// API endpoint to get the current vehicle location
app.get('/vehicle-location', (req, res) => {
  const currentLocation = locations[currentIndex];
  currentIndex = (currentIndex + 1) % locations.length;  // Loop through the locations array
  console.log("Sending location:", currentLocation); // Log the sent location
  res.json(currentLocation); // Send the current location as JSON
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});