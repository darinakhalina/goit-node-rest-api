import Joi from "joi";

import { emailRegexp } from "../constants/auth-constants.js";
import { defaultSubscription, subscriptionTypes } from "../constants/subscription-constants.js";

export const registerSchema = Joi.object({
    email: Joi.string().trim().lowercase().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
    subscription: Joi.string().valid(...subscriptionTypes).default(defaultSubscription),
})

export const loginSchema = Joi.object({
    email: Joi.string().trim().lowercase().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

export const updateSubscriptionSchema = Joi.object({
    subscription: Joi.string().valid(...subscriptionTypes).required(),
});