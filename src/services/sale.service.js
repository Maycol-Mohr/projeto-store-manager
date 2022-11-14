const { salesModel } = require('../models');
 const validateSales = require('./validations/validateSale');

const createSale = async (sale) => {
  const error = await validateSales.validateNewSale(sale);
  if (error.type) return error;

  const saleId = await salesModel.insertSales();
  await Promise.all(
    sale.map(async ({ productId, quantity }) =>
      salesModel.insertSalesProducts({ saleId, productId, quantity })),
  );

  return { type: null, message: { id: saleId, itemsSold: sale } };
};

module.exports = {
  createSale,
};
