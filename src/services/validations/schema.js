const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();
const salesSchema = Joi.object({
  productId: idSchema,
  quantity: idSchema,
});

const productNameValidateSchema = Joi.object(({
  name: Joi.string().min(5).required(),
}));

module.exports = {
  idSchema,
  productNameValidateSchema,
  salesSchema,
};
