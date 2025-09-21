import path from "node:path";
import fs from "node:fs/promises";
import bcrypt from "bcrypt";
import gravatar from "gravatar";

import User from "../db/models/User.js";

import HttpError from "../helpers/HttpError.js";
import { createToken } from "../helpers/jwt.js";

const avatarsDirPath = path.resolve("public", "avatars");

const findUser = query => User.findOne({
    where: query
})

const registerUser = async payload => {
    const email = payload.email.trim().toLowerCase();
    const avatarURL = gravatar.url(email, { s: "250", d: "mp", r: "g" }, true);
    const hashPassword = await bcrypt.hash(payload.password, 10);
    return User.create({ ...payload, email, password: hashPassword, avatarURL, });
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

const updateAvatar = async ({ userId, file }) => {
    if (!file) {
        throw HttpError(400, "Avatar file is required");
    }

    const user = await findUser({ id: userId });
    if (!user) {
        throw HttpError(401, "Not authorized");
    }

    const tempPath = file.path;
    const rawExt = path.extname(file.originalname);
    const safeExt = rawExt && rawExt.length ? rawExt.toLowerCase() : ".jpg";


    const finalFileName = `${userId}${safeExt}`;
    const finalFsPath = path.join(avatarsDirPath, finalFileName);
    const avatarURL = `/avatars/${finalFileName}`;

    try {
        await fs.mkdir(avatarsDirPath, { recursive: true });
        await fs.rename(tempPath, finalFsPath);
    } catch (err) {
        await fs.unlink(tempPath).catch(() => {
        });
        throw HttpError(500, "Avatar upload error");
    }

    await user.update({ avatarURL });

    return avatarURL;
};

export default { findUser, registerUser, loginUser, logoutUser, updateSubscriptionUser, updateAvatar };