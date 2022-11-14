const { salesSchema } = require('../services/validations/schema');
const { mapError } = require('../utils/errorMap');

module.exports = (req, res, next) => {
  const sales = req.body;
  const validationSale = sales.map((sale) =>
    salesSchema.validate(sale)).find((value) => value.error);
  if (validationSale) {
    const { type, message } = validationSale.error.details[0];
    return res.status(mapError(type)).json({ message });
  }
  next();
};
