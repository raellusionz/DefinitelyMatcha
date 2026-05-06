const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/reviewController');  // Import the controller

// Define your routes

router.post('/getSingleCustomerReviewPg', ReviewController.getSingleCustomerReviewPg); 
router.post('/newSingleCustomerReviewPg', ReviewController.newSingleCustomerReviewPg)

module.exports = router;  // Export the router