const UserSchema = require("../api/service/schemas/userSchema");
const { nanoid } = require("nanoid");
const EmailService = require("../api/service/email");

const createUser = async (userData) => {
  const verificationToken = nanoid();
  //send email
  return await UserSchema.create({ ...userData, verificationToken });
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

const updateAvatar = async (userId, data) => {
  return await UserSchema.findByIdAndUpdate(
    { _id: userId },
    { $set: { avatarURL: data } },
    { new: true }
  );
};

// const findByField = async () => {};

const verifyUser = async ({ token }) => {
  const user = await UserSchema.findByField({ verificationToken: token });

  // (user || !user.verify);
  if (user && !user.verify) {
    await user.updateOne({ verify: true, verificationToken: null });
    return true;
  }

  return false;
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  updateToken,
  updateAvatar,
  verifyUser,
};
