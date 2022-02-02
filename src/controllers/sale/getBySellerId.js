const saleService = require('../../services/sale');
const userService = require('../../services/user');
const { errors } = require('../../helpers');

module.exports = async (req, res, next) => {
  try {
    const { sellerId } = req.params;
    const user = await userService.getById(sellerId);
    if (!user) return next(errors.userNotFound);
    const sales = await saleService.getBySellerId(sellerId);
    if (sales.length === 0) return next(errors.salesNotFound);
    return res.status(200).json(sales);
  } catch (e) {
    return next(e);
  }
};
