const { compare } = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../../shared/errors");
const config = require("../../shared/config");
const User = require("./User");

const loginUser = async ({ phone_number, password }) => {
  const existing = await User.findOne({ phone_number });

  if (!existing) {
    throw new UnauthorizedError("Incorrect phone_number or password.");
  }

  const match = await compare(password, existing.password);

  if (!match) {
    throw new UnauthorizedError("Incorrect phone_number or password.");
  }

  const token = jwt.sign(
    { user: { id: existing._id, role: existing.role } },
    config.jwt.secret
  );

  return { token: token, role: existing.role };
};

module.exports = loginUser;
