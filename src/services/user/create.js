const { User } = require('../../database/models');
const validate = require('../validate');

module.exports = async ({ name, email, password, role }) => {
  const { error } = validate.user({ name, email, password, role });
  if (error) return { error: 'invalidFields' };

  const user = await User.findOne({ where: { email } });
  if (user) return { error: 'userExists' };

  const created = await User.create({ name, email, password, role });
  delete created.dataValues.password;
  return created;
};
