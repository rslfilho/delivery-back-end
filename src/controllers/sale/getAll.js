const saleService = require('../../services/sale');

module.exports = async (_req, res, next) => {
  try {
    const sales = await saleService.getAll();
    return res.status(200).json(sales);
  } catch (e) {
    return next(e);
  }
};
