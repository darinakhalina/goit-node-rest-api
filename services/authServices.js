import bcrypt from "bcrypt";

import User from "../db/models/User.js";

import HttpError from "../helpers/HttpError.js";
import { createToken } from "../helpers/jwt.js";

const findUser = query => User.findOne({
    where: query
})

const registerUser = async payload => {
    const email = payload.email.trim().toLowerCase();
    const hashPassword = await bcrypt.hash(payload.password, 10);
    return User.create({ ...payload, email, password: hashPassword });
}

const loginUser = async payload => {
    const { password } = payload;
    const email = payload.email.trim().toLowerCase();
    const user = await findUser({ email });

    if (!user) {
        throw HttpError(401, "Email or password is wrong");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong");
    }

    const tokenPayload = {
        id: user.id,
    }

    const token = createToken(tokenPayload);
    const updatedUser = await user.update({ token }, { returning: true });

    return updatedUser;
}

const logoutUser = async user => {
    await user.update({ token: null });
    return user;
}

const updateSubscriptionUser = async ({ userId, subscription }) => {
    const user = await findUser({ id: userId });
    if (!user) {
        throw HttpError(401, "Not authorized");
    }
    const updated = await user.update({ subscription }, { returning: true });
    return updated;
};

export default { findUser, registerUser, loginUser, logoutUser, updateSubscriptionUser };