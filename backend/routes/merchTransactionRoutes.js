const express = require('express');
const router = express.Router();
const merchTransactionController = require('../controllers/merchTransactionController');  // Import the controller

// Define your routes
//router.post('/transactions', transactionController.createTransaction);
router.post('/getAllMerchTransactionsPg', merchTransactionController.getAllMerchTransactionsPg); 
router.post('/allMerchTransactionsORM', merchTransactionController.getAllMerchTransactionsORM); 
router.post('/getSingleMerchTransactionsPg', merchTransactionController.getSingleMerchTransactionsPg); 
router.post('/getSingleMerchTransactionsORM', merchTransactionController.getSingleMerchTransactionsORM); 
router.post('/createNewMerchTransactionsPg', merchTransactionController.createNewMerchTransactionsPg); 
router.post('/newMerchTransactionsORM', merchTransactionController.createNewMerchTransactionsORM); 



module.exports = router;  // Export the router
