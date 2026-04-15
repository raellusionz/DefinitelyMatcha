const express = require('express');
const router = express.Router();
const custTransactionController = require('../controllers/custTransactionController');  // Import the controller

// Define your routes
//router.post('/transactions', transactionController.createTransaction);
router.post('/getAllSingleCustTransactionsPg', custTransactionController.getAllSingleCustTransactionsPg); 
router.post('/getAllSingleCustTransactionsORM', custTransactionController.getAllSingleCustTransactionsORM); 
//router.post('/getSingleCustTransactionsPg', custTransactionController.getSingleCustTransactionsPg); 
// router.post('/getSingleCustTransactionsORM', custTransactionController.getSingleCustTransactionsORM); 


module.exports = router;  // Export the router
