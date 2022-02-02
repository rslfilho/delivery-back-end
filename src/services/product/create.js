const { Product } = require('../../database/models');
const validate = require('../validate');

module.exports = async ({ name, price, urlImage }) => {
  const { error } = validate.product({ name, price, urlImage });
  if (error) return { error: 'invalidFields' };

  const product = await Product.findOne({ where: { name } });
  if (product) return { error: 'productExists' };

  const created = await Product.create({ name, price, urlImage });
  return created;
};
