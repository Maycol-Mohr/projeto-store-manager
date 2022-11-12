const { idSchema, productValidateSchema } = require('./schema');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INPUT_VALUE', message: '"id" must be a number' };
  return { type: null, message: '' };
};

const validateProduct = (body) => {
  const { error } = productValidateSchema.validate(body);
  if (error) {
    const { details } = error;
    return { type: details[0].type, message: error.message };
  }
};

module.exports = {
  validateId,
  validateProduct,
};
