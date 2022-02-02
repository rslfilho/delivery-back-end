const userService = require('../../services/user');
const { errors } = require('../../helpers');
const { jwt } = require('../../helpers');

module.exports = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const response = await userService.create({ name, email, password, role: 'customer' });
    if ('error' in response) return next(errors[response.error]);
    const { createdAt, updatedAt, ...user } = response.dataValues;
    const token = jwt.createToken(user);
    return res.status(201).json({ ...user, token });
  } catch (e) {
    return next(e);
  }
};
