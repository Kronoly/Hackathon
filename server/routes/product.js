const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Routes
router.get('/product', productController.view);
router.post('/product', productController.find);
router.get('/product/addproduct', productController.form);
router.post('/product/addproduct', productController.create);
router.get('/product/editproduct/:id', productController.edit);
router.post('/product/editproduct/:id', productController.update);
router.get('/product/viewproduct/:id', productController.viewall);
router.get('/product/:id',productController.delete);
  
module.exports = router;