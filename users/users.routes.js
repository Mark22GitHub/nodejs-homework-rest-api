const express = require("express");
const usersRouter = express.Router();

const {
  validate,
  signUpValidationSchema,
  validateVerifyEmail,
} = require("../api/helpers/validate");
const controller = require("./users.controllers");
const { checkTokenMiddleware } = require("./users.middlewares");

const { avatarUploadMiddleware } = require("./avatarUpload.middleware");
const { avatarCompress } = require("./avatarCompress");

usersRouter.post(
  "/signup",
  validate(signUpValidationSchema),
  controller.signUpController
);
usersRouter.post(
  "/login",
  validate(signUpValidationSchema),
  controller.loginController
);
usersRouter.post("/logout", checkTokenMiddleware, controller.logoutController);
usersRouter.get("/current", checkTokenMiddleware, controller.currentController);

usersRouter.patch(
  "/avatars",
  checkTokenMiddleware,
  avatarUploadMiddleware,
  avatarCompress,
  controller.uploadController
);

usersRouter.get("/verify/:verificationToken", controller.verifyController);

usersRouter.post(
  "/verify",
  validate(validateVerifyEmail),
  controller.verifyResendingController
);

module.exports = usersRouter;
