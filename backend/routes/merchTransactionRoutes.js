const express = require('express');
const router = express.Router();
const merchTransactionController = require('../controllers/merchTransactionController');  // Import the controller

// Define your routes
//router.post('/transactions', transactionController.createTransaction);
router.post('/allMerchTransactionsPg', merchTransactionController.getAllMerchTransactionsPg); 
router.post('/allMerchTransactionsORM', merchTransactionController.getAllMerchTransactionsORM); 
router.post('/singleMerchTransactionsPg', merchTransactionController.getSingleMerchTransactionsPg); 
router.post('/singleMerchTransactionsORM', merchTransactionController.getSingleMerchTransactionsORM); 
// router.get('/allTransactionsORM', TransactionController.getAllTransactionsORM); 
// router.get('/getSingleTransactionsPg/:txn_id', TransactionController.getSingleTransactionsByIdPG); 
// router.get('/getSingleTransactionsORM/:txn_id', TransactionController.getSingleTransactionsByIdORM); 
// router.post('/newTransactionsORM', TransactionController.createNewTransactionsORM); 
// router.post('/newTransactionsPg', TransactionController.createNewTransactionsPg); 
// router.delete('/deleteTransactionsORM/:txn_id', TransactionController.deleteTransactionByIdORM); 
// router.delete('/deleteTransactionsPg/:txn_id', TransactionController.deleteTransactionByIdPg); 


module.exports = router;  // Export the router
