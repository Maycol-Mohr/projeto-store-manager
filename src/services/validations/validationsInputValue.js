const { productNameValidateSchema } = require('./schema');

const validateProduct = (body) => {
  const { error } = productNameValidateSchema.validate(body);
  if (error) {
    const { details } = error;
    return { type: details[0].type, message: error.message };
  }
};

module.exports = {
  validateProduct,
};
