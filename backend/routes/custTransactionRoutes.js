const express = require('express');
const router = express.Router();
const custTransactionController = require('../controllers/custTransactionController');  // Import the controller

// Define your routes
//router.post('/transactions', transactionController.createTransaction);
router.post('/allCustTransactionsPg', custTransactionController.getAllCustTransactionsPg); 
router.post('/allCustTransactionsORM', custTransactionController.getAllCustTransactionsPg); 
router.post('/getSingleCustTransactionsPg', custTransactionController.getSingleCustTransactionsPg); 
router.post('/getSingleCustTransactionsORM', custTransactionController.getSingleCustTransactionsORM); 


module.exports = router;  // Export the router
