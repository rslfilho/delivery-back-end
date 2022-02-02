const { User } = require('../../database/models');

const options = {
  attributes: {
    exclude: ['password', 'createdAt', 'updatedAt'],
  },
};

module.exports = async (id) => User.findByPk(id, options);
