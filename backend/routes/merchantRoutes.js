const express = require('express');
const router = express.Router();
const merchantController = require('../controllers/merchantController');  // Import the controller

// Define your routes
router.post('/createMerchant', merchantController.createMerchant);
router.post('/loginMerchant', merchantController.loginMerchant); 
router.post('/logoutMerchant', merchantController.logoutMerchant);
router.get('/getAllMerchantNames',merchantController.getAllMerchantNamesPg)
router.post('/getOneMerchantPg', merchantController.getOneMerchantPg)

module.exports = router;  // Export the router
