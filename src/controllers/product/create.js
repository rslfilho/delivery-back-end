const productService = require('../../services/product');
const { errors } = require('../../helpers');

module.exports = async (req, res, next) => {
  try {
    const { name, price, urlImage } = req.body;
    const response = await productService.create({ name, price, urlImage });
    if ('error' in response) return next(errors[response.error]);
    return res.status(201).json(response);
  } catch (e) {
    return next(e);
  }
};
