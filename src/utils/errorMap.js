const errorMap = {
  PRODUCT_NOT_FOUND: 404,
  'any.required': 400,
  'string.min': 422,
  PRODUCT_CONFLICT: 409,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};
