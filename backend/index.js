// backend/index.js
require('dotenv').config();
const express = require('express');
const app = express();
const port = 3001; // You can change this to another port if needed

// Middleware to parse incoming JSON requests
app.use(express.json());

// Example route

//Transaction Routes
app.use ('/api/transactions', require('./routes/transactionRoutes'))
app.use ('/api/merchTransactions', require('./routes/merchTransactionRoutes'))
app.use ('/api/custTransactions', require('./routes/custTransactionRoutes'))

//Customer Routes
app.use ('/api/customer', require('./routes/custRoutes'))


//app.use ('/api/products', require('./routes/productRoutes'))
//app.use ('/api/inventory', require('./routes/inventoryRoutes'))

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});