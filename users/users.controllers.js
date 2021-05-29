const UserDB = require("./users.methods");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { createVerifiedToken } = require("../api/service/token");

// signup
const signUpController = async (req, res, next) => {
  const {
    body: { email, password },
  } = req;

  const user = await UserDB.findUserByEmail({ email });

  if (user) {
    return res.status(409).json({
      status: "Conflict",
      code: 409,
      message: "Email in use",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT)
    );
    const result = await UserDB.createUser({
      ...req.body,
      password: hashedPassword,
    });

    //   ==========
    // const avatar = result.avatarURL;
    // const avatarURL = avatarCreator(avatar, result.id);

    // const newContact = await UserDB.changeAvatar(result.id, avatarURL);
    //  =========

    res.status(201).json({
      status: "Created",
      code: 201,
      user: {
        email: result.email,
        subscription: result.subscription,
        avatarURL: result.avatarURL,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

// login
const loginController = async (req, res, next) => {
  try {
    const {
      body: { email, password },
    } = req;

    const user = await UserDB.findUserByEmail({ email });

    if (!user) {
      return res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Email or password is wrong",
      });
    }

    const isPasswordEqual = await bcrypt.compare(password, user.password);
    //??? проверка не работает,только отдельно: if (!user || !isPasswordEqual)
    if (!isPasswordEqual) {
      return res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Email or password is wrong",
      });
    }

    const token = await createVerifiedToken({ id: user._id });

    await UserDB.updateToken(user._id, token);

    res.status(200).json({
      status: "OK",
      code: 200,
      token: token,
      user: {
        email: user.email,
        subscription: "starter",
        avatarURL: user.avatarURL,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

//logout
const logoutController = async (req, res, next) => {
  try {
    const userInfo = await UserDB.findUserById(req.userId);
    console.log(userInfo);

    if (userInfo) {
      await UserDB.updateToken(req.userId, null);
      res.status(204).json({
        status: "No Content",
        code: 204,
      });
    } else {
      res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Not authorized",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

//current
const currentController = async (req, res, next) => {
  try {
    const current = await UserDB.findUserById(req.userId);

    if (!current) {
      res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Not authorized",
      });
    } else {
      res.status(200).json({
        status: "OK",
        code: 200,
        user: {
          email: current.email,
          subscription: current.subscription,
        },
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

// =============
const uploadController = async (req, res, next) => {
  const { extname } = require("path");
  const ext = extname(req.file.originalname);

  try {
    // !!! const newURL = `${req.userId}` + ext;
    // const newURL = Date.now() + ext;

    // ============
    // const avatarName = req.file.filename;
    // const newAvatarURL = `http://localhost:${process.env.PORT}/tmp/${avatarName}`;
    // const changeAvatarURL = (fileName) => {
    //   return `http://localhost:3000/images/${fileName}`;
    // };
    const avatarName = req.file.filename;
    // const avatarName = `${req.userId}` + ext;
    const newAvatarURL = `http://localhost:${process.env.PORT}/avatars/${avatarName}`;
    // =============

    // const newURL = req.file.filename;
    const url = await UserDB.changeAvatar(req.userId, newAvatarURL);

    if (url) {
      res.status(200).json({
        status: "OK",
        code: 200,
        user: {
          avatarURL: url.avatarURL,
        },
      });
    } else {
      res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Not authorized",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};
// =================

module.exports = {
  signUpController,
  loginController,
  logoutController,
  currentController,
  uploadController,
};
