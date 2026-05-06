const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');  // Import the controller

// Define your routes

router.get('/allProductsPg', productController.getAllProductsPg); 
router.get('/allProductsORM', productController.getAllProductsORM); 
router.post('/singleMerchantProductsPg', productController.getSingleMerchantProductsPg); 
router.post('/singleMerchantProductsORM', productController.getSingleMerchantProductsORM); 
router.post('/addSingleProductMerchantPg', productController.addSingleProductMerchantPg)
router.post('/addSingleProductMerchantORM', productController.addSingleProductMerchantORM)
router.delete('/deleteSingleProductMerchantPg', productController.deleteSingleProductMerchantPg)
router.delete('/deleteSingleProductMerchantORM', productController.deleteSingleProductMerchantORM)
router.patch('/updateSingleProductMerchantPg', productController.updateSingleProductMerchantPg)

module.exports = router;  // Export the router
