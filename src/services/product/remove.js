const { Product } = require('../../database/models');

module.exports = async (id) => {
  const product = await Product.findByPk(id);
  if (!product) return { error: 'productNotFound' };

  const deleted = await Product.destroy(
    { where: { id } },
  );
  return { deleted };
};
