const { Sale } = require('../../database/models');
const validate = require('../validate');

module.exports = async (id, status, user) => {
  const { error } = validate.status(status);
  if (error) return { error: 'invalidFields' };

  const sale = await Sale.findByPk(id);
  if (!sale) return { error: 'saleNotFound' };

  if (user.role === 'customer' && user.id !== sale.userId) return { error: 'unauthorizedUser' };

  const updated = await Sale.update(
    { status },
    { where: { id } },
  );
  return updated;
};
