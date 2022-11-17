// const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    `SELECT SP.sale_id AS saleId, SS.date, SP.product_id AS productId, SP.quantity
    FROM StoreManager.sales_products AS SP
    INNER JOIN StoreManager.sales AS SS
    ON SP.sale_id = SS.id
    ORDER BY SP.sale_id, SP.product_id`,
  );

  return result;
};

const findById = async (saleId) => {
  const [sale] = await connection.execute(
    `SELECT SS.date, SP.product_id AS productId, SP.quantity
    FROM StoreManager.sales_products AS SP
    INNER JOIN StoreManager.sales AS SS
    ON SP.sale_id = SS.id
    WHERE sale_id = ?
    ORDER BY SP.sale_id, SP.product_id`,
    [saleId],
  );
  return sale;
  // return camelize(sale);
};

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

const updateSale = async (saleUpdate, saleId, saleActual) => {
  await connection.execute(
    `UPDATE StoreManager.sales_products SET product_id = ?, quantity = ?
      WHERE sale_id = ? AND product_id = ? AND quantity = ?`,
    [saleUpdate.productId, saleUpdate.quantity, saleId, saleActual.productId, saleActual.quantity],
  );
};

const remove = async (id) => {
   const [{ affectedRows }] = await connection.execute(
     'DELETE FROM StoreManager.sales WHERE id = ?',
     [id],
   );
  return affectedRows;
};

module.exports = {
  insertSales,
  insertSalesProducts,
  findAll,
  findById,
  remove,
  updateSale,
};
