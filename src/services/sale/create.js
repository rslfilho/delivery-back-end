const validate = require('../validate');
const { Sale } = require('../../database/models');

module.exports = async ({ products, ...sale }) => {
  const { error } = validate.sale({ ...sale, products });
  if (error) return { error: 'invalidFields' };

  const createdSale = await Sale.create(sale);
  products.forEach(async ({ id, quantity }) => {
    await createdSale.addProducts(id, { through: { quantity } });
  });

  return createdSale;
};
