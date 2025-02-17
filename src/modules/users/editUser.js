const { hash } = require("bcryptjs");
const { NotFoundError, BadRequestError } = require("../../shared/errors");
const User = require("./User");

let SITE_URL = process.env.SITE_URL;
const editUserS = async ({ id, req, ...changes }) => {
  // Fix parameter order
  try {
    console.log(req.file, "REQ FILE");
    console.log(changes, "CHANGES");

    if (req.file) {
      console.log("kirdi");
      const imageUrl = `${SITE_URL}/${req.file.filename}`;
      changes.image = imageUrl;
    } else {
      console.log("kirmadi");
      changes.image;
    }
    const updatedUser = await User.findByIdAndUpdate(id, changes, {
      new: true,
    });

    if (!updatedUser) {
      throw new NotFoundError("User Not Found.");
    }
    if (changes.password) {
      const hashedPassword = await hash(changes.password, 10);

      updatedUser.password = hashedPassword;
      await updatedUser.save();
    }

    return updatedUser;
  } catch (error) {
    throw error;
  }
};

module.exports = editUserS;
