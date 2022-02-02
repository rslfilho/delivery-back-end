const { Sale, User, Product } = require('../../database/models');

const options = {
  attributes: {
    exclude: ['createdAt', 'updatedAt', 'userId', 'sellerId'],
  },
  include: [{
    model: User,
    as: 'seller',
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

module.exports = async (userId) => Sale.findAll({
  where: { userId },
  ...options,
});
