const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/transactionController');  // Import the controller

// Define your routes
//router.post('/transactions', transactionController.createTransaction);
router.get('/allTransactionsPg', TransactionController.getAllTransactionsPg); 
router.get('/allTransactionsORM', TransactionController.getAllTransactionsORM); 
router.post('/newTransactionsORM', TransactionController.createNewTransactionsORM); 
//router.get('/transactions/:txn_id', transactionController.getTransactionById);  // GET route for a specific transaction

module.exports = router;  // Export the router