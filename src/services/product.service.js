const { productModel } = require('../models');
const { validateId, validateProduct } = require('./validations/validationsInputValue');

const getProducts = async () => {
  const products = await productModel.findAll();
  return { type: null, message: products };
};

const findById = async (productId) => {
  const error = validateId(productId);
  if (error.type) return error;

  const product = await productModel.findById(Number(productId));
  if (product) return { type: null, message: product };
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

const createProduct = async (body) => {
  const error = validateProduct(body);
    if (error) return error;
    const { name } = body;
    const newProductId = await productModel.insert({ name });
    return findById(newProductId);
};

module.exports = {
  getProducts,
  findById,
  createProduct,
};
