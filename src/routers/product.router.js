const express = require('express');
const { productController } = require('../controllers');

const router = express.Router();

router.get('/:id', productController.getProductById);
router.get('/', productController.getProducts);
router.post('/', productController.createProduct);

module.exports = router;
