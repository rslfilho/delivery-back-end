const { User } = require('../../database/models');

module.exports = async (id) => {
  const user = await User.findByPk(id);
  if (!user) return { error: 'userNotFound' };

  const deleted = await User.destroy(
    { where: { id } },
  );
  return { deleted };
};
