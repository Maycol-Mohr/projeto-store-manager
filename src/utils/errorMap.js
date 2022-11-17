 const errorMap = {
   NOT_FOUND: 404,
   INVALID_VALUE: 403,
   'string.min': 422,
   'string.required': 400,
   'number.min': 422,
   'number.required': 422,
   FIELD_INVALID: 422,
   'any.required': 400,
   PRODUCT_NOT_FOUND: 404,
   SALE_NOT_FOUND: 404,
   'Sale not found': 404,
 };

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};
