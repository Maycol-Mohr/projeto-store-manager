const saleModel = require('../../models/sale.model');
const productModel = require('../../models/product.model');

const validateNewSale = async (sales) => {
  if (sales.some(({ quantity }) => Number(quantity) <= 0)) {
    return {
      type: 'INVALID_VALUE',
      message: '"quantity" must be greater than or equal to 1',
    };
  }

  const saleId = await Promise.all(
    sales.map(async ({ productId }) => productModel.findById(productId)),
  );
  const someSaleIsMising = saleId.some((sale) => sale === undefined);
  if (someSaleIsMising) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }
    return { type: null, message: '' };
};

const validateId = async (id) => {
  const sales = await saleModel.findAll();
  const sale = sales.find((sal) => sal.saleId === Number(id));
  console.log('teste', sales);
  if (!sale) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  }
  return { type: null, message: sale };
};

module.exports = {
  validateNewSale,
  validateId,
};
