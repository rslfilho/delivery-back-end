const { Sale, User, Product } = require('../../database/models');

const options = {
  attributes: {
    exclude: ['createdAt', 'updatedAt', 'userId', 'sellerId'],
  },
  include: [{
    model: User,
    as: 'customer',
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'password'],
    },
  }, {
    model: Product,
    as: 'products',
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
    through: { attributes: ['quantity'], as: 'details' },
  }],
};

module.exports = async (sellerId) => Sale.findAll({
  where: { sellerId },
  ...options,
});
