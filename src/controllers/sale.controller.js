const saleService = require('../services/sale.service');
const errorMap = require('../utils/errorMap');

const getSales = async (_req, res) => {
  const { message } = await saleService.getSales();

  res.status(200).json(message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.findById(Number(id));
  // if (type) return res.status(404).json({ message });
   if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(200).json(message);
};

const createSale = async (req, res) => {
  const { type, message } = await saleService.createSale(req.body);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(201).json(message);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const sales = req.body;
  const { type, message } = await saleService.updateSale(id, sales);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(200).json(message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.removeSale(id);
  if (type) {
    return res.status(errorMap.mapError(type)).json({ message });
  }
  return res.status(204).end();
};

module.exports = {
  createSale,
  getSales,
  getSaleById,
  deleteSale,
  updateSale,
};
