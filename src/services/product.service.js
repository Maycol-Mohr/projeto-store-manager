const { productModel } = require('../models');
const { validateProduct } = require('./validations/validationsInputValue');

const getProducts = async () => {
  const products = await productModel.findAll();
  return { type: null, message: products };
};

const findById = async (productId) => {
  const product = await productModel.findById(Number(productId));
  if (product) return { type: null, message: product };
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

const createProduct = async (body) => {
  const error = validateProduct(body);
    if (error) return error;
    const { name } = body;
    const productId = await productModel.insert({ name });
    const newProductId = await productModel.findById(productId);
    return { type: null, message: newProductId };
};

const verifyId = async (id) => {
  const products = await productModel.findAll();
  const product = products.find((prod) => prod.id === Number(id));
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return { type: null };
};

const updateProduct = async (id, name) => {
  const result = await verifyId(id);
  if (result.type) return result;
  const updateProductNow = await productModel.updateProduct(id, name);
  if (updateProductNow) return { type: null, message: updateProductNow };
};

module.exports = {
  getProducts,
  findById,
  createProduct,
  updateProduct,
};
