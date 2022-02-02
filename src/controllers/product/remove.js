const productService = require('../../services/product');
const { errors } = require('../../helpers');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await productService.remove(id);
    if ('error' in response) return next(errors[response.error]);
    return res.status(200).json({ id, message: 'Product deleted', status: 'Success' });
  } catch (e) {
    return next(e);
  }
};
