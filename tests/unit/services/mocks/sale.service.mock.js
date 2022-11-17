const insertId = 10;

const validParams = [
  {
    productId: 2,
    quantity: 20,
  },
  {
    productId: 3,
    quantity: 10,
  },
  // {
  //   productId: 4,
  //   quantity: 15,
  // },
  // {
  //   productId: 5,
  //   quantity: 155,
  // },
];

const listSales = [
  {
    productId: 2,
    quantity: 20,
  },
  {
    productId: 3,
    quantity: 10,
  },
  {
    productId: 4,
    quantity: 15,
  },
  {
    productId: 5,
    quantity: 155,
  },
];

const endValidParams = {
  id: 1,
  itemsSold: validParams,
};

const invalidParams = [
  {
    productId: 200,
    quantity: 15,
  },
];

const saleParams = [
  {
    productId: 1,
    quantity: 1,
  },
];

module.exports = {
  insertId,
  validParams,
  invalidParams,
  endValidParams,
  listSales,
  saleParams,
};
