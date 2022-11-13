const productList = [
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
  name: "Bola de futebol",
};

const productNew = {
  name: "Bola de futebol",
};

const producError = {
  name: "Bola",
};

const productNotFound = {
  type: "PRODUCT_NOT_FOUND",
  message: "Product not found",
};

module.exports = {
  productList,
  product,
  productNotFound,
  productNew,
  producError,
};
