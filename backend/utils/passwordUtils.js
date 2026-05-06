const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

const hashPassword = async (plainPassword) => {
  if (!plainPassword) return null;

  return await bcrypt.hash(plainPassword, SALT_ROUNDS);
};

const comparePassword = async (plainPassword, hashedPassword) => {
  if (!plainPassword || !hashedPassword) return false;

  return await bcrypt.compare(plainPassword, hashedPassword);
};

module.exports = {
  hashPassword,
  comparePassword,
};