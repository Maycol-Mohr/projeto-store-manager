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
  if (!sale) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  }
  return { type: null, message: sale };
};

const validateSaleId = async (id) => {
  const products = await saleModel.findAll();
  const product = products.find((prod) => prod.saleId === Number(id));
  if (!product) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }
  return { type: null, message: product };
};

const validateSales = async (sales) => {
  if (sales.some((sale) => sale.quantity <= 0)) {
    return { type: 'FIELD_INVALID', message: '"quantity" must be greater than or equal to 1' };
  }
  const products = await Promise.all(sales.map(async ({ productId }) =>
    productModel.findById(productId)));
  if (products.some((product) => product === undefined)) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }
  return { type: null };
};

module.exports = {
  validateNewSale,
  validateId,
  validateSaleId,
  validateSales,
};
