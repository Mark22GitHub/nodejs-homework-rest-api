const fs = require("fs/promises");
const path = require("path");
const contactsJSON = path.join(__dirname, "./contacts.json");

//GET
const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsJSON, "utf-8");
    return JSON.parse(contacts);
  } catch (error) {
    console.error(error.message);
  }
};

//GET
const getById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const ContactId = contacts.find(
      (contact) => String(contact.id) === contactId
    );
    return ContactId;
  } catch (error) {
    console.error(error.message);
  }
};

//DELETE
const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex(
      (contact) => String(contact.id) === contactId
    );
    const deleteContact = contacts.filter(
      (contact) => String(contact.id) !== contactId
    );
    const stringifiedDeletedContact = JSON.stringify(deleteContact);
    await fs.writeFile(contactsJSON, stringifiedDeletedContact);
    return contactIndex;
  } catch (error) {
    console.error(error.message);
  }
};

//POST
const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newListContacts = [...contacts, body];
    const stringifiedCreatedContact = JSON.stringify(newListContacts);
    await fs.writeFile(contactsJSON, stringifiedCreatedContact);
    return newListContacts;
  } catch (error) {
    console.error(error.message);
  }
};

//PUT
const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: contactId,
      ...body,
    };
    const updatedContacts = contacts.map((contact) =>
      String(contact.id) === newContact.id ? { ...newContact } : contact
    );
    const contactIndex = updatedContacts.findIndex(
      (contact) => String(contact.id) === contactId
    );
    const stringifiedUpdatedContact = JSON.stringify(updatedContacts);
    await fs.writeFile(contactsJSON, stringifiedUpdatedContact);
    return updatedContacts[contactIndex];
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
