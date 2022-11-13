const products = [
  {
    id: 1,
    name: "martelo de thor",
  },
  {
    id: 2,
    name: "traje de encolhimento",
  },
  {
    id: 3,
    name: "escudo do capitao america",
  },
];

const product = {
    id: 1,
    name: "martelo de thor",
  };

const productNotFound = {
  type: "PRODUCT_NOT_FOUND",
  message: "Product not found",
};

module.exports = {
  products,
  product,
  productNotFound,
};
