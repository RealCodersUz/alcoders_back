const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    full_name: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    phone_number: {
      type: mongoose.SchemaTypes.String,
      required: true,
      unique: true,
    },
    region: {
      type: mongoose.SchemaTypes.String,
    },
    bio: {
      type: mongoose.SchemaTypes.String,
    },
    image: {
      type: mongoose.SchemaTypes.String,
    },
    sellers: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Sales",
      },
    ],
    role: {
      type: mongoose.SchemaTypes.String,
      enum: ["super_admin", "admin", "omborchi"],
      default: "admin",
    },
    password: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    is_valid: {
      type: mongoose.SchemaTypes.Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;

// -full_name (str)
// -phone_number (str)
// -password
// -region (str)
// -bio (str)
// -image (1ta)
// -role (enum)
// -sellers []
