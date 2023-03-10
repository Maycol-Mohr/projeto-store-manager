const { productService } = require('../services');
const errorMap = require('../utils/errorMap');

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
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type, message } = await productService.updateProduct(id, name);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(200).json(message);
};

const deleteProduct = async (req, res) => {
   const { id } = req.params;
  const { type, message } = await productService.removeProduct(id);
  if (type) { return res.status(errorMap.mapError(type)).json({ message }); }
  return res.status(204).end();
};

const getProductBySearch = async (req, res) => {
  const { q } = req.query;
  const { message } = await productService.getBySearch(q);
  return res.status(200).json(message);
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductBySearch,
};
