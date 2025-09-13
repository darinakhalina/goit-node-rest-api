import Contact from "../db/models/Contact.js";

async function listContacts() {
    return await Contact.findAll();
}

async function getContactById(contactId) {
    return await Contact.findByPk(contactId);
}

async function removeContact(contactId) {
    const contact = await getContactById(contactId);

    if (!contact) {
        return null;
    }

    await contact.destroy();

    return contact;
}

async function addContact({ name, email, phone, favorite = false }) {
    return await Contact.create({ name, email, phone, favorite });
}

async function updateContact(contactId, data) {
    const contact = await getContactById(contactId);

    if (!contact) {
        return null;
    }

    await contact.update(data);

    return contact;
}

async function updateStatusContact(contactId, favoriteValue) {
    return updateContact(contactId, { favorite: favoriteValue });
}

export default { listContacts, getContactById, removeContact, addContact, updateContact, updateStatusContact };
