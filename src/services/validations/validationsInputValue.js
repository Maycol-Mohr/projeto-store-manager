const { productNameValidateSchema, idSchema } = require('./schema');
const { productModel } = require('../../models');

const validateProduct = (body) => {
  const { error } = productNameValidateSchema.validate(body);
  if (error) {
    const { details } = error;
    return { type: details[0].type, message: error.message };
  }
};

const verifyId = async (id) => {
  const products = await productModel.findAll();
  const product = products.find((prod) => prod.id === Number(id));
  console.log('TESTE', products);
  if (!product) { return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' }; }
  return { type: null, message: '' };
};

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) {
    const { details } = error;
    return { type: details[0].type, message: error.message };
  }
  return { type: null, message: '' };
};

module.exports = {
  validateProduct,
  verifyId,
  validateId,
};
