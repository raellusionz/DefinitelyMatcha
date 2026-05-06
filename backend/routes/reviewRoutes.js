const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/reviewController');  // Import the controller

// Define your routes

router.post('/getSingleCustomerReviewPg', ReviewController.getSingleCustomerReviewPg); 
router.post('/newSingleCustomerReviewPg', ReviewController.newSingleCustomerReviewPg)
router.post('/getMerchantAverageReviewPg', ReviewController.getMerchantAverageReviewPg)

module.exports = router;  // Export the router