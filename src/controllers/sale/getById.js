const saleService = require('../../services/sale');
const { errors } = require('../../helpers');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await saleService.getById(id);
    if (!sale) return next(errors.saleNotFound);
    return res.status(200).json(sale);
  } catch (e) {
    return next(e);
  }
};
