const { salesModel } = require('../models');
const validateSales = require('./validations/validateSale');

const getSales = async () => {
  const sales = await salesModel.findAll();
  return { type: null, message: sales };
};

const findById = async (saleId) => {
  // const error = validateSales.validateId(saleId);
  // if (error.type) return error;
  const sale = await salesModel.findById(saleId);
  if (sale.length !== 0) return { type: null, message: sale };
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
};

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

const removeSale = async (id) => {
  const result = await validateSales.validateId(id);
  if (result.type) return result;
  const response = await salesModel.remove(id);
  return { type: null, message: response };
};

module.exports = {
  createSale,
  getSales,
  findById,
  removeSale,
};
