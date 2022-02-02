const { Product } = require('../../database/models');

module.exports = async (id) => Product.findByPk(id, {
  attributes: {
    exclude: ['createdAt', 'updatedAt'],
  },
});
