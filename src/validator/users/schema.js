const Joi = require('joi');

const UserPayloadSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  namaDesa: Joi.string(),
  alamatDesa: Joi.string(),
  provinsi: Joi.string(),
  kotaKabupaten: Joi.string(),
  namaNarahubung: Joi.string(),
  nomorTelepon: Joi.number().integer().min(12),
});

module.exports = { UserPayloadSchema };
