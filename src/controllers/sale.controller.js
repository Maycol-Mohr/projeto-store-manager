const saleService = require('../services/sale.service');
const errorMap = require('../utils/errorMap');

const createSale = async (req, res) => {
  const { type, message } = await saleService.createSale(req.body);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(201).json(message);
};

module.exports = {
  createSale,
};
