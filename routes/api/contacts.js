const express = require("express");
const router = express.Router();
const controller = require("../controller/contactsController");

router.get("/", controller.getContactsController);
router.get("/:contactId", controller.getContactByIdController);
router.post("/", controller.createContactController);
router.delete("/:contactId", controller.deleteContactController);
router.put("/:contactId", controller.updateContactController);
router.patch("/:contactId/favorite", controller.updateFavoriteController);

module.exports = router;
