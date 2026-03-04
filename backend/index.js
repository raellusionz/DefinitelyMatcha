// backend/index.js
require('dotenv').config();
const express = require('express');

const app = express();
const port = 3001; // You can change this to another port if needed

// Middleware to parse incoming JSON requests
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

seq

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});