const Joi = require("joi");

exports.addNewsSchema = {
  body: Joi.object({
    name_uz: Joi.string(),
    name_ru: Joi.string(),
    name_en: Joi.string(),
    name_kr: Joi.string(),

    description_uz: Joi.string(),
    description_ru: Joi.string(),
    description_en: Joi.string(),
    description_kr: Joi.string(),
  }),
};

exports.patchNewsSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
  body: Joi.object({
    name_uz: Joi.string(),
    name_ru: Joi.string(),
    name_en: Joi.string(),
    name_kr: Joi.string(),

    description_uz: Joi.string(),
    description_ru: Joi.string(),
    description_en: Joi.string(),
    description_kr: Joi.string(),
  }),
};

exports.allNewsSchema = {
  query: Joi.object({
    q: Joi.string(),
    sort: Joi.object({
      by: Joi.string().valid("_id"),
      order: Joi.string().valid("asc", "desc"),
    }),
    page: Joi.object({
      offset: Joi.number().integer().min(0).default(0),
      limit: Joi.number().integer().min(1).default(3),
    }),
  }),
};
