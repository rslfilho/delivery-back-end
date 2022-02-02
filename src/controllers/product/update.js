const productService = require('../../services/product');
const { errors } = require('../../helpers');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price, urlImage } = req.body;
    const response = await productService.update(id, { name, price, urlImage });
    if ('error' in response) return next(errors[response.error]);
    return res.status(200).json({ id, message: 'Product updated', status: 'Success' });
  } catch (e) {
    return next(e);
  }
};
