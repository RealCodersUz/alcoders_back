const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema(
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
    description_ru: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    description_kr: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    is_deleted: {
      type: mongoose.SchemaTypes.Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

const Feedback = mongoose.model("Feedback", FeedbackSchema);

module.exports = Feedback;
