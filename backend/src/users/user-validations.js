const Joi = require('joi');

module.exports.userValidations = {
  newSchema: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.ref('password'),
  }),
}