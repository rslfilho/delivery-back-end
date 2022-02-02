const Joi = require('joi');

const schema = Joi.string()
  .valid('Pendente', 'Preparando', 'Em Trânsito', 'Entregue')
  .required();
  
module.exports = (string) => schema.validate(string);
