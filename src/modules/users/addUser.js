const { hash } = require("bcryptjs");
const User = require("./User");

let SITE_URL = process.env.SITE_URL;
const addUser = async (req) => {
  try {
    const { full_name, phone_number, region, bio, role, password } = req.body;
    const hashedPassword = await hash(password, 10);

    const imageUrl = req.file ? `${SITE_URL}/${req.file.filename}` : "";
    const user = new User({
      full_name,
      phone_number,
      region,
      bio,
      image: imageUrl,
      role,
      password: hashedPassword,
    });

    await user.save();

    return user; // Returning the user object
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add user");
  }
};

module.exports = addUser;
