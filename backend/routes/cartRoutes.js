const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');  // Import the controller

// Define your routes
router.post('/getUserCartPg', cartController.getUserCartPg);
router.delete('/resetUserCartPg', cartController.resetUserCartPg);
router.post('/addItemToCartPg', cartController.addItemToCartPg);
router.delete('/reduceQuantityCartPg', cartController.reduceQuantityCartPg)
router.delete('/removeCartItemPg', cartController.removeCartItemPg)
router.post('/getUserCartCheckOutPg', cartController.getUserCartCheckOutPg)


module.exports = router;  // Export the router
 