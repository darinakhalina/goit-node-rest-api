import { Op } from "sequelize";
import Contact from "../db/models/Contact.js";

async function listContacts({ userId, query = {} }) {
    const {
        page = 1,
        limit: limitFromQuery,
        favorite,
        search,
        sort = "createdAt",
        order = "DESC",
    } = query;

    const rawLimit = limitFromQuery ?? 10;
    const limit = Math.max(1, Math.min(Number(rawLimit) || 10, 100));

    const allowedSort = new Set([
        "createdAt",
        "updatedAt",
        "name",
        "email",
        "phone",
        "favorite",
        "id",
    ]);
    const sortField = allowedSort.has(String(sort)) ? String(sort) : "createdAt";
    const sortOrder = String(order).toUpperCase() === "ASC" ? "ASC" : "DESC";

    const where = { owner: userId };

    if (favorite !== undefined) {
        const f = String(favorite).toLowerCase();
        if (f === "true") {
            where.favorite = true;
        } else if (f === "false") {
            where.favorite = false;
        }
    }

    if (search?.trim()) {
        const q = search.trim();
        where[Op.or] = [
            { name: { [Op.iLike]: `%${q}%` } },
            { email: { [Op.iLike]: `%${q}%` } },
            { phone: { [Op.iLike]: `%${q}%` } },
        ];
    }

    const currentPage = Math.max(1, Number(page) || 1);
    const offset = (currentPage - 1) * limit;


    const orderClauses = [[sortField, sortOrder]];
    if (sortField !== "id") {
        orderClauses.push(["id", sortOrder]);
    }

    const { rows, count } = await Contact.findAndCountAll({
        where,
        order: orderClauses,
        limit,
        offset,
    });

    return {
        items: rows.map(r => r.toJSON()),
        total: count,
        page: currentPage,
        limit,
        totalPages: Math.ceil(count / limit),
    };
}

export async function getContactById({ contactId, userId }) {
    const row = await Contact.findOne({ where: { id: contactId, owner: userId } });
    return row ? row.toJSON() : null;
}

async function removeContact({ contactId, userId }) {
    const contact = await Contact.findOne({ where: { id: contactId, owner: userId } });

    if (!contact) {
        return null;
    }

    await contact.destroy();

    return contact.toJSON();
}

async function addContact({ body, userId }) {
    const created = await Contact.create({ ...body, owner: userId });
    return created.toJSON();
}

async function updateContact({ contactId, body, userId }) {
    const [count, updatedRows] = await Contact.update(body, {
        where: { id: contactId, owner: userId },
        returning: true,
    });
    if (!count) {
        return null;
    }

    return updatedRows[0].toJSON();
}

async function updateStatusContact({ contactId, body, userId }) {
    const { favorite } = body;
    const [count, updatedRows] = await Contact.update({ favorite }, {
        where: { id: contactId, owner: userId },
        returning: true,
    });

    if (!count) {
        return null;
    }

    return updatedRows[0].toJSON();
}

export default { listContacts, getContactById, removeContact, addContact, updateContact, updateStatusContact };