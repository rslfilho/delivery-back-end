const Joi = require('joi');

const schema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(6)
    .required(),
});

module.exports = (obj) => schema.validate(obj);
