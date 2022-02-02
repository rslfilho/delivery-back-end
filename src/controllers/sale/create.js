const saleService = require('../../services/sale');
const { errors } = require('../../helpers');

module.exports = async (req, res, next) => {
  try {
    const { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, products } = req.body;
    const response = await saleService.create({
      userId,
      sellerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      products });
    if ('error' in response) return next(errors[response.error]);
    return res.status(201).json(response);
  } catch (e) {
    return next(e);
  }
};
