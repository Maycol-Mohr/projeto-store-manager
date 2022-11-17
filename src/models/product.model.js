const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute('SELECT * FROM StoreManager.products');

  return result;
};

const findById = async (productId) => {
  const [[product]] = await connection.execute('SELECT * FROM StoreManager.products WHERE id = ?',
    [productId]);
  return camelize(product);
};

const insert = async (product) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [product.name],
  );
  return insertId;
};

const updateProduct = async (id, name) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [name, id],
  );
  return { id, name };
};

const remove = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return affectedRows;
};

const findBySearch = async (search) => {
  const [result] = await connection.execute(
    `SELECT * FROM StoreManager.products
      WHERE name LIKE '%${search}%'`,
  );
  return result;
};

module.exports = {
  findAll,
  findById,
  insert,
  updateProduct,
  remove,
  findBySearch,
};
