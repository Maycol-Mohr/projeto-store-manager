const express = require('express');
const { productController } = require('../controllers');
const validateNameProduct = require('../middlewares/validateNameProduct');

const router = express.Router();

router.get('/:id', productController.getProductById);
router.get('/', productController.getProducts);
router.post('/', validateNameProduct, productController.createProduct);

module.exports = router;
