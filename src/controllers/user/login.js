const userService = require('../../services/user');
const { errors } = require('../../helpers');

module.exports = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const response = await userService.login(email, password);
    if ('error' in response) return next(errors[response.error]);
    return res.status(200).json(response);
  } catch (e) {
    return next(e);
  }
};
