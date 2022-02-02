const productService = require('../../services/product');
const { errors } = require('../../helpers');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productService.getById(id);

    if (!product) return next(errors.productNotFound);
  
    return res.status(200).json(product);
  } catch (e) {
    return next(e);
  }
};
