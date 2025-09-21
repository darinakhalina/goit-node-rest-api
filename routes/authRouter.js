import express from "express";

import authenticate from "../middlewares/authenticate.js";

import authControllers from "../controllers/authControllers.js";

import validateBody from "../helpers/validateBody.js";

import {
    registerSchema,
    loginSchema,
    updateSubscriptionSchema,
    emailUserSchema,
} from "../schemas/authSchemas.js";

import upload from "../middlewares/upload.js";

const authRouter = express.Router();

authRouter.post(
    "/register",
    validateBody(registerSchema),
    authControllers.registerUser
);

authRouter.get("/verify/:verificationToken", authControllers.verifyUser);

authRouter.post(
    "/verify",
    validateBody(emailUserSchema),
    authControllers.resendVerificationMail
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

authRouter.patch(
    "/avatars",
    authenticate,
    upload.single("avatar"),
    authControllers.updateAvatar,
);

export default authRouter;
