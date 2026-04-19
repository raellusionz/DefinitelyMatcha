const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');  // Import the controller

// Define your routes
router.get('/allOrdersPg', orderController.getAllOrdersPg);
router.get('/allOrdersORM', orderController.getAllOrdersORM);
router.post('/getSingleOrderItemsPg', orderController.getSingleOrderItemsPg);
//router.post('/getSingleOrderItemsORM', orderController.getSingleOrderItemsORM);
router.post('/createSingleOrderItemsPg', orderController.createSingleOrderItemsPg);
// router.post('/createSingleOrderItemsORM', orderController.createSingleOrderItemsORM)

module.exports = router;  // Export the router
