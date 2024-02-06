const fs = require('fs').promises; 
const { nanoid } = require('nanoid');
const path = require('path'); 

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const data = await listContacts();
  const result = data.find(i => i.id === contactId);
  return result || null;
}

async function removeContact(contactId) {
  const data = await listContacts();
  const contact = data.find(i => i.id === contactId);
  if (!contact) {
    return null
  }
  const newData = data.filter(el => el.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(newData, null, 2));
  return contact
 }

async function addContact(name, email, phone) {
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone
  }
  const data = await listContacts();
  data.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};