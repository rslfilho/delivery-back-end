const userService = require('../../services/user');

module.exports = async (_req, res, next) => {
  try {
    const users = await userService.getAllAndSales();
    return res.status(200).json(users);
  } catch (e) {
    return next(e);
  }
};
