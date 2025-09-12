import fs from 'node:fs/promises';
import path from 'node:path';
import { v4 as uuid } from "uuid";

const contactsPath = path.resolve('db', 'contacts.json');

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Failed to read contacts file.', error.message);
        return [];
    }
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    return contact || null;
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);

    if (index === -1) {
        return null;
    }

    const [removedContact] = contacts.splice(index, 1);

    try {
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return removedContact;
    } catch (error) {
        console.error('Failed to write contacts file.', error.message);
        return null;
    }
}

async function addContact({ name, email, phone }) {
    const contacts = await listContacts();

    const newContact = { id: uuid(), name, email, phone };

    contacts.push(newContact);

    try {
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return newContact;
    } catch (error) {
        console.error("Failed to write contacts file.", error.message);
        return null;
    }
}

async function updateContact(contactId, data) {
    const contacts = await listContacts();
    const index = contacts.findIndex((c) => c.id === contactId);
    if (index === -1) return null;

    const prev = contacts[index];
    const updated = { ...prev, ...data };
    contacts[index] = updated;

    try {
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return updated;
    } catch (error) {
        console.error('Failed to write contacts file.', error.message);
        return null;
    }
}

export default { listContacts, getContactById, removeContact, addContact, updateContact };
