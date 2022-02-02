const saleService = require('../../services/sale');
const { errors } = require('../../helpers');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await saleService.remove(id);
    if ('error' in response) return next(errors[response.error]);
    return res.status(200).json({ id, message: 'Sale deleted', status: 'Success' });
  } catch (e) {
    return next(e);
  }
};
