const { User } = require('../../database/models');

const options = {
  attributes: {
    exclude: ['password', 'createdAt', 'updatedAt'],
  },
};

module.exports = async () => User.findAll(options);
