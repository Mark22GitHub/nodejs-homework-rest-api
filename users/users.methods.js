const UserSchema = require("../api/service/schemas/userSchema");

const createUser = async (userData) => {
  return await UserSchema.create(userData);
};

const findUserByEmail = async (query) => {
  return await UserSchema.findOne(query);
};

const findUserById = async (id) => {
  return await UserSchema.findById(id);
};

const updateToken = async (id, token) => {
  return await UserSchema.updateOne({ _id: id }, { token });
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  updateToken,
};
