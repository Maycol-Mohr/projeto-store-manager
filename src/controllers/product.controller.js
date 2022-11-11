const { productService } = require('../services');

const getProducts = async (_req, res) => {
  const { message } = await productService.getProducts();

  res.status(200).json(message);
};

const getProductById = async (req, res) => {
  console.log('passei por aqui');
  const { id } = req.params;
  const { type, message } = await productService.findById(id);
  console.log(type);
  if (message === 'Product not found') {
    return res.status(404).json({ message });
  }
  return res.status(200).json(message);
};

module.exports = {
  getProducts,
  getProductById,
};
