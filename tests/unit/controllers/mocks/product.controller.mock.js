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

const updateProduct = {
  id: 1,
  name: "Bola de futebol atualizada",
};

const updateProductNow = {
  id: 1,
  name: "Bola de futebol atualizada",
};

const productNotFound = {
  type: "PRODUCT_NOT_FOUND",
  message: "Product not found",
};

module.exports = {
  productList,
  product,
  productNotFound,
  updateProduct,
  updateProductNow,
};
