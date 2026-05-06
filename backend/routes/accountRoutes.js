const express = require('express');
const router = express.Router();
const AccountController = require('../controllers/accountController');  // Import the controller

// Define your routes

router.post('/getCustomerAccountDetails', AccountController.getCustomerAccountDetails)


module.exports = router;  // Export the router