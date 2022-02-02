const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string()
    .min(12)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(6)
    .required(),
  role: Joi.string()
    .valid('customer', 'seller', 'administrator')
    .required(),
});

module.exports = (obj) => schema.validate(obj);
