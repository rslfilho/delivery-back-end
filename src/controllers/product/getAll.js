const productService = require('../../services/product');

module.exports = async (_req, res, next) => {
  try {
    const products = await productService.getAll();
  
    return res.status(200).json(products);
  } catch (e) {
    return next(e);
  }
};
