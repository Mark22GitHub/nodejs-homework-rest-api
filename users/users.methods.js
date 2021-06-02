const UserSchema = require("../api/service/schemas/userSchema");
const { nanoid } = require("nanoid");
// const EmailServices = require("../api/service/schemas/userSchema");

// const EmailService = require("../api/service/email");
// const emailService = new EmailService();

const sendEmail = require("../api/service/email");

const createUser = async (userData) => {
  const { email } = userData;
  const verificationToken = nanoid();

  //send email
  //   await sendEmail(verificationToken, email);
  try {
    await sendEmail(verificationToken, email);
  } catch (error) {
    // console.error(error);
    throw new Error("?Service Unavailable");
  }

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

const findByField = async (field) => {
  return UserSchema.findOne(field);
};

const verifyUser = async ({ token }) => {
  const user = await findByField({ verificationToken: token });
  // (user && !user.verify);
  if (user) {
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
