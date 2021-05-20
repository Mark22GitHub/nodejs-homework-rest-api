const ContactSchema = require("../service/schemas/contactSchema");

const getContacts = async (userId) => {
  return await ContactSchema.find({ owner: userId });
};

const getContactByID = async (contactID, userId) => {
  if (contactID.match(/^[0-9a-fA-F]{24}$/)) {
    return await ContactSchema.findOne({ _id: contactID, owner: userId });
  }
};

const createContact = async (userData, userId) => {
  return await ContactSchema.create({ ...userData, owner: userId });
};

const deleteContact = async (contactID, userId) => {
  if (contactID.match(/^[0-9a-fA-F]{24}$/)) {
    return await ContactSchema.findByIdAndRemove({
      _id: contactID,
      owner: userId,
    });
  }
};

const updateContact = async (contactID, userId, userData) => {
  if (contactID.match(/^[0-9a-fA-F]{24}$/)) {
    return await ContactSchema.findByIdAndUpdate(
      { _id: contactID, owner: userId },
      userData,
      {
        new: true,
      }
    );
  }
};

const updateStatusContact = async (contactID, userId, body) => {
  if (contactID.match(/^[0-9a-fA-F]{24}$/)) {
    return await ContactSchema.findByIdAndUpdate(
      { _id: contactID, owner: userId },
      body,
      {
        new: true,
      }
    );
  }
};

const findUserById = async (id) => {
  return await ContactSchema.findById(id);
};

module.exports = {
  getContacts,
  getContactByID,
  createContact,
  deleteContact,
  updateContact,
  updateStatusContact,
  findUserById,
};
