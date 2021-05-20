const UserDB = require("../routes/service/schemas/userSchema");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { createVerifiedToken } = require("../routes/service/token");

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
    res.status(201).json({
      status: "Created",
      code: 201,
      user: {
        email: result.email,
        subscription: result.subscription,
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

module.exports = {
  signUpController,
  loginController,
  logoutController,
  currentController,
};
