const { productModel } = require('../models');
const { validateProduct, verifyId } = require('./validations/validationsInputValue');

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

// const verifyId = async (id) => {
//   const products = await productModel.findAll();
//   const product = products.find((prod) => prod.id === Number(id));
//   if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
//   return { type: null, message: '' };
// };

const updateProduct = async (id, name) => {
  const result = await verifyId(id);
  if (result.type) return result;
  const updateProductNow = await productModel.updateProduct(id, name);
  if (updateProductNow) return { type: null, message: updateProductNow };
};

const removeProduct = async (id) => {
   const result = await verifyId(id);
  if (result.type) return result;
  const response = await productModel.remove(id);
  return { type: null, message: response };
};

// const getBySearch = async (name) => {
//   const result = name ? await productModel.findBySearch(name) : await productModel.findAll();
//   return { message: result };
// };

const getBySearch = async (name) => {
  const search = await productModel.findBySearch(name);
  return { type: null, message: search };
};

module.exports = {
  getProducts,
  findById,
  createProduct,
  updateProduct,
  removeProduct,
  getBySearch,
};
