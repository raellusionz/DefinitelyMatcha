// backend/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');  
const app = express();
const port = 3001; // You can change this to another port if needed

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(cors());

// Example route

//Transaction Routes
app.use ('/api/transactions', require('./routes/transactionRoutes'))
app.use ('/api/merchTransactions', require('./routes/merchTransactionRoutes'))
app.use ('/api/custTransactions', require('./routes/custTransactionRoutes'))

//Customer Routes
app.use ('/api/customer', require('./routes/custRoutes'))

//Product Routes
app.use ('/api/products', require('./routes/productRoutes'))

app.use ('/api/orders', require('./routes/orderRoutes'))
app.use ('/api/merchants', require('./routes/merchantRoutes'))

app.use('/api/cart', require('./routes/cartRoutes'))

//Account Routes
app.use('/ap/account', require('./routes/accountRoutes'))


//Review System Routes
app.use('/api/reviews', require('./routes/reviewRoutes'))

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});