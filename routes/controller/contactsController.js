const contactsDB = require("../service/mongooseMethods");
const {
  validate,
  createContactSchema,
  updateContactSchema,
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
const getContactByIdController = async (req, res, next) => {
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
        message: "Not found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

//POST
// const createContactSchema = Joi.object({
//   name: Joi.string(),
//   email: Joi.string().email(),
//   phone: Joi.string(),
// });
const createContactController =
  (validate(createContactSchema),
  async (req, res, next) => {
    const { name, email, phone } = req.body;
    const body = { name, email, phone };

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
const deleteContactController = async (req, res, next) => {
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
};

//PUT
// const updateContactSchema = Joi.object({
//   name: Joi.string(),
//   email: Joi.string().email(),
//   phone: Joi.string(),
// }).min(1);

const updateContactController =
  (validate(updateContactSchema),
  async (req, res, next) => {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    const body = { name, email, phone };

    try {
      if (!name || !email || !phone) {
        res.status(400).json({
          message: "missing fields",
        });
      } else {
        const updatedContact = await contactsDB.updateContact(contactId, body);

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
    } catch (e) {
      console.error(e);
      next(e);
    }
  });

//   PATCH

// const updateFavoriteController = async (req, res, next) => {
//   const { id } = req.params;
//   const { isDone = false } = req.body;

//   try {
//     const result = await service.updateTask(id, { isDone });
//     if (result) {
//       res.json({
//         status: "success",
//         code: 200,
//         data: { task: result },
//       });
//     } else {
//       res.status(404).json({
//         status: "error",
//         code: 404,
//         message: `Not found task id: ${id}`,
//         data: "Not Found",
//       });
//     }
//   } catch (e) {
//     console.error(e);
//     next(e);
//   }
// };

module.exports = {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  updateContactController,
};
