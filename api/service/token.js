const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET_KEY } = process.env;

const createVerifiedToken = async (payload) => {
  const token = await jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "1d" });
  return `Bearer ${token}`;
};

const verifyToken = async (token) => {
  const decodedToken = token.replace("Bearer ", "");
  return await jwt.verify(decodedToken, JWT_SECRET_KEY);
};

module.exports = {
  createVerifiedToken,
  verifyToken,
};
