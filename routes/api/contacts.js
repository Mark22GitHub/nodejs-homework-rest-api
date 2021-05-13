const express = require("express");
const router = express.Router();
const controllerContacts = require("../controller/contactsController");

router.get("/", controllerContacts.getContactsController);
router.get("/:contactId", controllerContacts.getContactByIdController);
router.post("/", controllerContacts.createContactController);
router.delete("/:contactId", controllerContacts.deleteContactController);
router.put("/:contactId", controllerContacts.updateContactController);
router.patch(
  "/:contactId/favorite",
  controllerContacts.updateFavoriteController
);

// =============

module.exports = router;
