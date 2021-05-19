const contactsDB = require("../service/mongooseMethods");
const {
  validate,
  createContactSchema,
  updateContactSchema,
  updateStatusContactSchema,
  validateIDSchema,
} = require("../helpers/validate");

//GET
const getContactsController = async (req, res, next) => {
  try {
    const contacts = await contactsDB.getContacts();
    res.status(200).json({
      message: "List of all contacts",
      data: {
        contacts,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

//GETBYID
const getContactByIdController =
  (validate(validateIDSchema, "params"),
  async (req, res, next) => {
    const { contactId } = req.params;

    try {
      const contactById = await contactsDB.getContactByID(contactId);

      if (contactById) {
        res.status(200).json({
          message: "Get contact by ID",
          data: {
            contactById,
          },
        });
      } else {
        res.status(404).json({
          message: "Contact was not found",
        });
      }
    } catch (e) {
      console.error(e);
      next(e);
    }
  });

//POST
const createContactController =
  (validate(createContactSchema),
  async (req, res, next) => {
    const { name, email, phone, favorite = false } = req.body;
    const body = { name, email, phone, favorite };

    try {
      const newContact = await contactsDB.createContact(body);

      if (!name || !email || !phone) {
        res.status(400).json({
          message: "missing required name field",
        });
      } else {
        res.status(201).json({
          message: "New contact was created",
          data: {
            newContact,
          },
        });
      }
    } catch (e) {
      console.error(e);
      next(e);
    }
  });

//DELETE
const deleteContactController =
  (validate(validateIDSchema, "params"),
  async (req, res, next) => {
    const { contactId } = req.params;

    try {
      const deletedContact = await contactsDB.deleteContact(contactId);

      if (deletedContact !== -1) {
        res.status(200).json({
          message: "Contact deleted",
        });
      } else {
        res.status(404).json({
          message: "Not found",
        });
      }
    } catch (e) {
      console.error(e);
      next(e);
    }
  });

//PUT
const updateContactController =
  (validate(updateContactSchema),
  validate(validateIDSchema, "params"),
  async (req, res, next) => {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;

    try {
      // if (!name || !email || !phone) {
      //   res.status(400).json({
      //     message: "missing fields",
      //   });
      // }

      const updatedContact = await contactsDB.updateContact(
        contactId,
        req.body
      );

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
    } catch (e) {
      console.error(e);
      next(e);
    }
  });

// PATCH
const updateFavoriteController =
  (validate(updateStatusContactSchema),
  validate(validateIDSchema, "params"),
  async (req, res, next) => {
    const { contactId } = req.params;
    const { favorite = false } = req.body;
    const body = { favorite };

    try {
      if (!body) {
        res.status(400).json({
          message: "missing field favorite",
        });
      } else {
        const updatedFavorite = await contactsDB.updateStatusContact(
          contactId,
          body
        );

        if (updatedFavorite) {
          res.status(200).json({
            message: "Contact status was successfuly updated",
            data: {
              updatedFavorite,
            },
          });
        } else {
          res.status(404).json({
            message: "Not found",
          });
        }
      }
    } catch (e) {
      console.error(e);
      next(e);
    }
  });

module.exports = {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  updateContactController,
  updateFavoriteController,
};
