const { productNameValidateSchema, idSchema } = require('./schema');

const validateProduct = (body) => {
  const { error } = productNameValidateSchema.validate(body);
  if (error) {
    const { details } = error;
    return { type: details[0].type, message: error.message };
  }
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
  validateId,
};
