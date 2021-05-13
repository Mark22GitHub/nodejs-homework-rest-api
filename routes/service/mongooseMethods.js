const ContactSchema = require("../service/schemas/contactSchema");

const getContacts = async () => {
  return await ContactSchema.find();
};

const getContactByID = async (contactID) => {
  return await ContactSchema.findOne({ _id: contactID });
};

const createContact = async (userData) => {
  return await ContactSchema.create(userData);
};

const deleteContact = async (contactID) => {
  return await ContactSchema.findByIdAndRemove({ _id: contactID });
};

const updateContact = async (contactID, userData) => {
  return await ContactSchema.findByIdAndUpdate({ _id: contactID }, userData, {
    new: true,
  });
};

module.exports = {
  getContacts,
  getContactByID,
  createContact,
  deleteContact,
  updateContact,
};
