const ContactSchema = require("../service/schemas/contactSchema");

const getContacts = async () => {
  return await ContactSchema.find();
};

const getContactByID = async (contactID) => {
  if (contactID.match(/^[0-9a-fA-F]{24}$/)) {
    return await ContactSchema.findOne({ _id: contactID });
  }
};

const createContact = async (userData) => {
  return await ContactSchema.create(userData);
};

const deleteContact = async (contactID) => {
  if (contactID.match(/^[0-9a-fA-F]{24}$/)) {
    return await ContactSchema.findByIdAndRemove({ _id: contactID });
  }
};

const updateContact = async (contactID, userData) => {
  if (contactID.match(/^[0-9a-fA-F]{24}$/)) {
    return await ContactSchema.findByIdAndUpdate({ _id: contactID }, userData, {
      new: true,
    });
  }
};

const updateStatusContact = async (contactID, body) => {
  if (contactID.match(/^[0-9a-fA-F]{24}$/)) {
    return await ContactSchema.findByIdAndUpdate({ _id: contactID }, body, {
      new: true,
    });
  }
};

module.exports = {
  getContacts,
  getContactByID,
  createContact,
  deleteContact,
  updateContact,
  updateStatusContact,
};
