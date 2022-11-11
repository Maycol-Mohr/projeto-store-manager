const { productModel } = require('../models');
const { validateId } = require('./validations/validationsInputValue');

const getProducts = async () => {
  const products = await productModel.findAll();
  return { type: null, message: products };
};

const findById = async (productId) => {
  const error = validateId(productId);
  if (error.type) return error;

  const product = await productModel.findById(productId);
  if (product) return { type: null, message: product };
  return { type: 'PRODUCT_NOT_FOUND ', message: 'Product not found' };
};

module.exports = {
  getProducts,
  findById,
};
