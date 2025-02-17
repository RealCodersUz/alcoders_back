const Joi = require("joi");

exports.postRegisterUserSchema = {
  body: Joi.object({
    full_name: Joi.string().required(),
    phone_number: Joi.string().required(),
    region: Joi.string().required(),
    bio: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

exports.postLoginUserSchema = {
  body: Joi.object({
    phone_number: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

exports.patchMeSchema = {
  body: Joi.object({
    full_name: Joi.string(),
    phone_number: Joi.string(),
    region: Joi.string(),
    bio: Joi.string(),
    password: Joi.string(),
  }),
};

exports.patchUserSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),

  body: Joi.object({
    full_name: Joi.string(),
    phone_number: Joi.string(),
    region: Joi.string(),
    bio: Joi.string(),
    password: Joi.string(),
    role: Joi.string(),
    is_valid: Joi.boolean(),
  }),
};

exports.showUserSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
};

exports.allUserSchema = {
  query: Joi.object({
    q: Joi.string(),
    sort: Joi.object({
      by: Joi.string().valid("age"),
      order: Joi.string().valid("asc", "desc"),
    }),
    page: Joi.object({
      offset: Joi.number().integer().min(0).default(0),
      limit: Joi.number().integer().min(1).default(10),
    }),
    filters: {
      role: Joi.valid("admin", "omborchi"),
    },
  }),
};

exports.deleteUserSchmea = {
  params: Joi.object({
    id: Joi.string(),
  }),
};
