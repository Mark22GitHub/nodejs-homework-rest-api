const express = require("express");
const usersRouter = express.Router();

const {
  validate,
  signUpValidationSchema,
} = require("../routes/helpers/validate");
const controller = require("./users.controllers");
const { checkTokenMiddleware } = require("./users.middlewares");

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

module.exports = usersRouter;
