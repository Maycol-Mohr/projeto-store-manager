const { idSchema } = require('./schema');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INPUT_VALUE', message: '"id" must be a number' };
  return { type: null, message: '' };
};

module.exports = {
  validateId,
};
