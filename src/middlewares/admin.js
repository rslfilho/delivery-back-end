const { errors } = require('../helpers');

module.exports = async (req, _res, next) => {
  const { role } = req.user;

  if (role !== 'administrator') return next(errors.unauthorizedUser);

  next();
};
