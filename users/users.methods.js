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

const changeAvatar = async (userId, data) => {
  return await UserSchema.findByIdAndUpdate(
    { _id: userId },
    { $set: { avatarURL: data } },
    { new: true }
  );
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  updateToken,
  changeAvatar,
};
