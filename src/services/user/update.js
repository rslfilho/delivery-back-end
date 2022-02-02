const { User } = require('../../database/models');
const validate = require('../validate');

module.exports = async (id, { name, email, password, role }) => {
  const { error } = validate.user({ name, email, password, role });
  if (error) return { error: 'invalidFields' };

  const user = await User.findByPk(id);
  if (!user) return { error: 'userNotFound' };

  const updated = await User.update(
    { name, email, password, role },
    { where: { id } },
  );
  return updated;
};
