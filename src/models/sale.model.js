// const camelize = require("camelize");
const connection = require('./connection');

const insertSales = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (default)',
  );
  return insertId;
};

const insertSalesProducts = async (salesProduct) => {
  console.log('insersalesmodel', salesProduct);
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [salesProduct.saleId, salesProduct.productId, salesProduct.quantity],
  );
  return insertId;
};

module.exports = {
  insertSales,
  insertSalesProducts,
};
