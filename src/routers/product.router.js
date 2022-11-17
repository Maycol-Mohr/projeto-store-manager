const express = require('express');
const { productController } = require('../controllers');
const validateNameProduct = require('../middlewares/validateNameProduct');

const router = express.Router();

router.get('/search', productController.getProductBySearch);
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.post('/', validateNameProduct, productController.createProduct);
router.put('/:id', validateNameProduct, productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
