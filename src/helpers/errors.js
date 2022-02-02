const errors = {
  invalidFields: { 
    statusCode: 400,
    code: 'bad_request',
    message: 'Invalid fields',
  },
  wrongPassword: {
    statusCode: 400,
    code: 'bad_request',
    message: '"password" is invalid',
  },
  userExists: {
    statusCode: 409,
    code: 'conflict',
    message: 'User already registered',
  },
  unauthorizedUser: {
    statusCode: 401,
    code: 'unauthorized',
    message: 'Unauthorized user',
  },
  userNotFound: {
    statusCode: 404,
    code: 'not_found',
    message: 'User does not exist',
  },
  productExists: {
    statusCode: 409,
    code: 'conflict',
    message: 'Product already registered',
  },
  productNotFound: {
    statusCode: 404,
    code: 'not_found',
    message: 'Product does not exist',
  },
  salesNotFound: {
    statusCode: 404,
    code: 'not_found',
    message: 'This user does not have any sales',
  },
  saleNotFound: {
    statusCode: 404,
    code: 'not_found',
    message: 'Sale does not exist',
  },
  missingToken: {
    statusCode: 401,
    code: 'unauthorized',
    message: 'Token not found',
  },
  jwtMalformed: {
    statusCode: 401,
    code: 'unauthorized',
    message: 'Expired or invalid token',
  },
};

module.exports = errors;
