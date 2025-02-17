const Joi = require("joi");

exports.addProductsSchema = {
  body: Joi.object({
    name_uz: Joi.string(),
    name_ru: Joi.string(),
    name_en: Joi.string(),
    name_kr: Joi.string(),

    description_uz: Joi.string(),
    description_ru: Joi.string(),
    description_en: Joi.string(),
    description_kr: Joi.string(),

    price: Joi.number(),
    included_uz: Joi.string(),
    included_ru: Joi.string(),
    included_en: Joi.string(),
    included_kr: Joi.string(),

    type: Joi.string().valid("premium", "standard").required(),

    discount: Joi.number().default(0),
    category_id: Joi.string(),
  }),
};

exports.patchProductsSchema = {
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

    price: Joi.number(),

    included_uz: Joi.string(),
    included_ru: Joi.string(),
    included_en: Joi.string(),
    included_kr: Joi.string(),
    type: Joi.string().valid("premium", "standard").required(),

    discount: Joi.number().default(0),
    changed_img: Joi.string(),
    category_id: Joi.string(),
  }),
};

exports.allProductsSchema = {
  query: Joi.object({
    q: Joi.string(),
    sort: Joi.object({
      by: Joi.string().valid("name_uz", "price", "quantity", "createdAt"),
      order: Joi.string().valid("asc", "desc"),
    }),
    page: Joi.object({
      offset: Joi.number().integer().min(0).default(0),
      limit: Joi.number().integer().min(1).default(3),
    }),
    categoryId: Joi.string(),
  }),
};

// -name - CRM /
// -price - 100$ /
// -type - premium oddiy /
// -description - haqida /
// -includid - afzalliklar
// -discount - aksiya
// -image /
