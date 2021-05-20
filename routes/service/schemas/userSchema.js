const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(6));
};

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const UserSchema = mongoose.model("user", userSchema);

// userMethods
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
  UserSchema,
  createUser,
  findUserByEmail,
  findUserById,
  updateToken,
};
