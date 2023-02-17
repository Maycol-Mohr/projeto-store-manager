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

// const findAll = async () => {
//   const [sales] = await connection.execute(
//     `SELECT sale_id, sale.date, salesProducts.product_id, salesProducts.quantity
//     FROM StoreManager.sales AS sale
//     INNER JOIN sales_products AS salesProducts
//     ON sale.id = salesProducts.sale_id`,
//   );
//   return camelize(sales);
// };

// const findById = async (salesId) => {
//   const [sale] = await connection.execute(
//     `SELECT sale.date, salesProducts.product_id, salesProducts.quantity
//     FROM StoreManager.sales AS sale
//     INNER JOIN sales_products AS salesProducts
//     ON sale.id = salesProducts.sale_id
//     WHERE sale.id = ?`,
//     [salesId],
//   );
//   return camelize(sale);
// };

const insertSales = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (default)',
  );
  return insertId;
};

const insertSalesProducts = async (salesProduct) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [salesProduct.saleId, salesProduct.productId, salesProduct.quantity],
  );
  return insertId;
};

const updateSale = async (saleUpdate, saleId, saleActual) => {
  const [{ affectedRows }] = await connection.execute(
    `UPDATE StoreManager.sales_products SET product_id = ?, quantity = ?
      WHERE sale_id = ? AND product_id = ? AND quantity = ?`,
    [
      saleUpdate.productId,
      saleUpdate.quantity,
      saleId,
      saleActual.productId,
      saleActual.quantity,
    ],
  );
  return affectedRows;
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
