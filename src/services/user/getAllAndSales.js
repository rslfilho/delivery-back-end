const { User, Sale, Product } = require('../../database/models');

const options = {
  attributes: {
    exclude: ['password', 'createdAt', 'updatedAt'],
  },
  include: [{
    model: Sale,
    as: 'userOrders',
    attributes: {
      exclude: ['userId', 'createdAt', 'updatedAt'],
    },
    include: {
      model: Product,
      as: 'products',
      through: { attributes: ['quantity'], as: 'details' },
    },
  }, {
    model: Sale,
    as: 'userSales',
    attributes: {
      exclude: ['sellerId', 'createdAt', 'updatedAt'],
    },
    include: {
      model: Product,
      as: 'products',
      through: { attributes: ['quantity'], as: 'details' },
    },
  }],
};

module.exports = async () => User.findAll(options);
