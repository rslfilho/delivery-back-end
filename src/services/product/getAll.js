const { Product } = require('../../database/models');

module.exports = async () => Product.findAll({
  attributes: {
    exclude: ['createdAt', 'updatedAt'],
  },
});
