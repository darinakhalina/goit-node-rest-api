import express from "express";

import authenticate from "../middlewares/authenticate.js";

import authControllers from "../controllers/authControllers.js";

import validateBody from "../helpers/validateBody.js";

import { registerSchema, loginSchema, updateSubscriptionSchema } from "../schemas/authSchemas.js";

const authRouter = express.Router();

authRouter.post(
    "/register",
    validateBody(registerSchema),
    authControllers.registerUser
);

authRouter.post(
    "/login",
    validateBody(loginSchema),
    authControllers.loginUser
);

authRouter.get("/current", authenticate, authControllers.getCurrentUser);

authRouter.post("/logout", authenticate, authControllers.logoutUser);

authRouter.patch(
    "/subscription",
    authenticate,
    validateBody(updateSubscriptionSchema),
    authControllers.updateSubscriptionUser
);

export default authRouter;
