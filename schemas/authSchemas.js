import Joi from "joi";

import { emailRegexp } from "../constants/auth-constants.js";

const SUBSCRIPTIONS = ["starter", "pro", "business"]; // move to constants

export const registerSchema = Joi.object({
    email: Joi.string().trim().lowercase().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
    subscription: Joi.string().valid(...SUBSCRIPTIONS).default("starter"),
})

export const loginSchema = Joi.object({
    email: Joi.string().trim().lowercase().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

export const updateSubscriptionSchema = Joi.object({
    subscription: Joi.string().valid(...SUBSCRIPTIONS).required(),
});