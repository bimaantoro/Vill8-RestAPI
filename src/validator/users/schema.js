const Joi = require('joi');

const UserPayloadSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  namaNarahubung: Joi.string().required(),
  nomorTelepon: Joi.number().integer().min(12)
    .required(),
});

module.exports = UserPayloadSchema;
