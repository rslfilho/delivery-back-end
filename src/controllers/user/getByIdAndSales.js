const userService = require('../../services/user');
const { errors } = require('../../helpers');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user } = req;
    if (user.role === 'customer' && user.id !== +id) return next(errors.unauthorizedUser);
    const response = await userService.getByIdAndSales(id);
    if (!response) return next(errors.userNotFound);
    return res.status(200).json(response);
  } catch (e) {
    return next(e);
  }
};
