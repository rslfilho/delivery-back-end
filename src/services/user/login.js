const md5 = require('md5');
const { jwt } = require('../../helpers');
const { User } = require('../../database/models');
const validate = require('../validate');

module.exports = async (email, password) => {
  const { error } = validate.login({ email, password });
  if (error) return { error: 'invalidFields' };

  const user = await User.findOne({ where: { email } });

  if (!user) return { error: 'userNotFound' };
  if (user.password !== md5(password)) return { error: 'wrongPassword' };

  const { id, name, role } = user;
  const userData = { id, name, email, role };

  const token = jwt.createToken(userData);
  
  return { ...userData, token };
};
