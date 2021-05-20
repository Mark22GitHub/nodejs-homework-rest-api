const express = require("express");
const router = express.Router();
const controller = require("../controller/contactsController");
const { checkTokenMiddleware } = require("../../users/users.middlewares");

router.get("/", checkTokenMiddleware, controller.getContactsController);
router.get(
  "/:contactId",
  checkTokenMiddleware,
  controller.getContactByIdController
);
router.post("/", checkTokenMiddleware, controller.createContactController);
router.delete(
  "/:contactId",
  checkTokenMiddleware,
  controller.deleteContactController
);
router.put(
  "/:contactId",
  checkTokenMiddleware,
  controller.updateContactController
);
router.patch(
  "/:contactId/favorite",
  checkTokenMiddleware,
  controller.updateFavoriteController
);

module.exports = router;
