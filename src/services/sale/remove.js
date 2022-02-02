const { Sale } = require('../../database/models');

module.exports = async (id) => {
  const sale = await Sale.findByPk(id);
  if (!sale) return { error: 'saleNotFound' };

  const deleted = await Sale.destroy(
    { where: { id } },
  );
  return { deleted };
};
