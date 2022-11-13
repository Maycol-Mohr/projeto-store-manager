const { productService } = require('../services');
const { mapError } = require('../utils/errorMap');

const getProducts = async (_req, res) => {
  const { message } = await productService.getProducts();

  res.status(200).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.findById(id);
  if (type) return res.status(404).json({ message });
  return res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const { body } = req;
  const { type, message } = await productService.createProduct(body);
  if (type) return res.status(mapError(type)).json({ message });

  res.status(201).json(message);
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
};
