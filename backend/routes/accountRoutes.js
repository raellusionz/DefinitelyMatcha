const express = require('express');
const router = express.Router();
const AccountController = require('../controllers/accountController');  // Import the controller

// Define your routes

router.post('/getCustomerAccountDetailsPg', AccountController.getCustomerAccountDetailsPg)
router.patch('/updateCustomerAccountPg',AccountController.updateCustomerAccountPg)

module.exports = router;  // Export the router