import express from "express";
import contactsCtrl from "../controllers/contactsControllers.js";

import validateBody from "../helpers/validateBody.js";

import { createContactSchema, updateContactSchema, updateStatusContactSchema } from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsCtrl.getAllContacts);

contactsRouter.get("/:id", contactsCtrl.getOneContact);

contactsRouter.delete("/:id", contactsCtrl.deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), contactsCtrl.createContact);

contactsRouter.put("/:id", validateBody(updateContactSchema), contactsCtrl.updateContact);

contactsRouter.patch("/:id/favorite", validateBody(updateStatusContactSchema), contactsCtrl.updateStatusContact);

export default contactsRouter;
