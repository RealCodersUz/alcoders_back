const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema(
  {
    name_uz: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    name_ru: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    name_en: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    name_kr: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    description_uz: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    description_ru: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    description_en: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    description_kr: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    included_uz: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    included_ru: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    included_en: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    included_kr: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    price: {
      type: mongoose.SchemaTypes.Number,
      required: true,
    },
    type: {
      type: mongoose.SchemaTypes.String,
      required: true,
      enum: ["premium", "standart"],
    },
    discount: {
      type: mongoose.SchemaTypes.Number,
      default: 0,
      required: false,
    },
    category_id: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "Category",
    },
    image: {
      type: mongoose.SchemaTypes.String,
    },
    is_deleted: {
      type: mongoose.SchemaTypes.Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Products = mongoose.model("Products", ProductsSchema);

module.exports = Products;

// -name - CRM /
// -price - 100$ /
// -type - premium oddiy /
// -description - haqida /
// -includid - afzalliklar
// -discount - aksiya
// -image /
