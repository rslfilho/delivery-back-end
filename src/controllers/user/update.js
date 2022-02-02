const userService = require('../../services/user');
const { errors } = require('../../helpers');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;
    const response = await userService.update(id, { name, email, password, role });
    if ('error' in response) return next(errors[response.error]);
    return res.status(200).json({ id, message: 'User updated', status: 'Success' });
  } catch (e) {
    return next(e);
  }
};
