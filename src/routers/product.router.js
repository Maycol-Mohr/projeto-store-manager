const express = require('express');
const { productController } = require('../controllers');

const router = express.Router();

router.get('/:id', productController.getProductById);
router.get('/', productController.getProducts);

module.exports = router;
