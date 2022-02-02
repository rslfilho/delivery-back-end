const { jwt, errors } = require('../helpers');

module.exports = (req, _res, next) => {
  const { authorization: token } = req.headers;

  if (!token) return next(errors.missingToken);

  const data = jwt.validateToken(token);

  if ('message' in data) return next(errors.jwtMalformed);
  
  req.user = data;

  return next();
};
