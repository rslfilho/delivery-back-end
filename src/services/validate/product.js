const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string()
    .required(),
  price: Joi.number()
    .precision(2)
    .positive()
    .required(),
  urlImage: Joi.string()
    .required(),
});

module.exports = (obj) => schema.validate(obj);
