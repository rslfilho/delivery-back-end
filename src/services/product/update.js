const { Product } = require('../../database/models');
const validate = require('../validate');

module.exports = async (id, { name, price, urlImage }) => {
  const { error } = validate.product({ name, price, urlImage });
  if (error) {
    console.log(error);
    return { error: 'invalidFields' };
  }

  const product = await Product.findByPk(id);
  if (!product) return { error: 'productNotFound' };

  const updated = await Product.update(
    { name, price, urlImage },
    { where: { id } },
  );
  return updated;
};
