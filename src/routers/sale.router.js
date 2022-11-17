const express = require('express');
const { saleController } = require('../controllers');
const validateProductId = require('../middlewares/validateProductId');
const validateUpdateSale = require('../middlewares/validateUpdateSale');

const router = express.Router();

router.get('/', saleController.getSales);
router.get('/:id', saleController.getSaleById);
router.post('/', validateProductId, saleController.createSale);
router.put('/:id', validateUpdateSale, saleController.updateSale);
router.delete('/:id', saleController.deleteSale);

module.exports = router;
