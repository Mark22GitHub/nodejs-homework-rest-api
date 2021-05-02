const express = require("express");
const router = express.Router();

const modelContacts = require("../../model/index");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");
const { validate } = require("../helpers/validate");

//GET
router.get("/", async (req, res, next) => {
  const contacts = await modelContacts.listContacts();
  res.status(200).json({
    message: "List of all contacts",
    data: {
      contacts,
    },
  });
});

//GET
router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contactById = await modelContacts.getById(contactId);

  if (contactById) {
    res.status(200).json({
      message: "Get contact by ID",
      data: {
        contactById,
      },
    });
  } else {
    res.status(404).json({
      message: "Not found",
    });
  }
});

//POST
const createContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
});
router.post("/", validate(createContactSchema), async (req, res, next) => {
  const { name, email, phone } = req.body;
  const body = { name, email, phone };
  const newContact = {
    id: uuidv4(),
    ...body,
  };
  const createdContact = await modelContacts.addContact(newContact);

  if (!name || !email || !phone) {
    res.status(400).json({
      message: "missing required name field",
    });
  } else {
    res.status(201).json({
      message: "New contact was created",
      data: {
        createdContact,
      },
    });
  }
});

//DELETE
router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const deletedContact = await modelContacts.removeContact(contactId);

  if (deletedContact !== -1) {
    res.status(200).json({
      message: "Contact deleted",
    });
  } else {
    res.status(404).json({
      message: "Not found",
    });
  }
});

//PUT
const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
}).min(1);

router.put(
  "/:contactId",
  validate(updateContactSchema),
  async (req, res, next) => {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    const body = { name, email, phone };

    if (!name || !email || !phone) {
      res.status(400).json({
        message: "missing fields",
      });
    } else {
      const updatedContact = await modelContacts.updateContact(contactId, body);

      if (updatedContact) {
        res.status(200).json({
          message: "Contact was successfuly updated",
          data: {
            updatedContact,
          },
        });
      } else {
        res.status(404).json({
          message: "Not found",
        });
      }
    }
  }
);

module.exports = router;
