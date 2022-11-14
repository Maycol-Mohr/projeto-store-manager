const express = require('express');
const { saleController } = require('../controllers');
const validateProductId = require('../middlewares/validateProductId');

const router = express.Router();

router.post('/', validateProductId, saleController.createSale);

module.exports = router;
