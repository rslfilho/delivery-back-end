const jwt = require('jsonwebtoken');

const secret = 'meu_segredo_muito_forte';

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const createToken = (payload) => {
  const token = jwt.sign({ data: payload }, secret, jwtConfig);
  return token;
};

const validateToken = (token) => {
  try {
    const { data } = jwt.verify(token, secret);
    return data;
  } catch (err) {
    return err;
  }
};

module.exports = {
  createToken,
  validateToken,
};
