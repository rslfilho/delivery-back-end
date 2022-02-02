const saleService = require('../../services/sale');
const { errors } = require('../../helpers');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const { user } = req;
    const response = await saleService.updateStatus(id, status, user);
    if ('error' in response) return next(errors[response.error]);
    return res.status(200).json({ id, message: 'Sale status updated', status: 'Success' });
  } catch (e) {
    return next(e);
  }
};
