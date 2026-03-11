const express = require('express');
const router = express.Router();
const customerController = require('../controllers/custTransactionController');  // Import the controller

// Define your routes
//router.post('/transactions', transactionController.createTransaction);
router.post('/getAllCustomers', customerController.getAllCustomersPg); 



module.exports = router;  // Export the router
