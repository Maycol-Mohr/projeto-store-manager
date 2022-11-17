module.exports = (req, res, next) => {
  const sales = req.body;
  if (sales.some((sale) => !sale.productId)) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  if (sales.some((sale) => !sale.quantity && sale.quantity !== 0)) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  next();
};
